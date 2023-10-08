import React, { useCallback, useEffect, useState } from "react"
import { useAnchorWallet, useConnection } from "@solana/wallet-adapter-react"
import { AnchorProvider, BN, IdlAccounts, Program } from "@coral-xyz/anchor"
import { GameCore, IDL } from "@/lib/types/game_core"
import {
  PublicKey,
  TransactionMessage,
  VersionedTransaction,
} from "@solana/web3.js"
import { signAndSendTransactionInstructions } from "@/utils/transactions"
import { toast } from "react-toastify"
import {
  createAssociatedTokenAccountInstruction,
  getAssociatedTokenAddress,
} from "@solana/spl-token"
export type Palace = IdlAccounts<typeof IDL>["playerPalace"]
export type Player = IdlAccounts<typeof IDL>["player"]

const PROGRAM_ID = new PublicKey("9LqUvkM7zkVqpYypCRsuh5KitHbZZFrcfwkRVgirnnUf")

const mint = PublicKey.findProgramAddressSync(
  [Buffer.from("mint")],
  PROGRAM_ID
)[0]

export default function useGameCore() {
  const { connection } = useConnection()
  const [program, setProgram] = useState<Program<GameCore> | null>(null)
  const wallet = useAnchorWallet()
  const [balance, setBalance] = useState(0)
  const [palace, setPalace] = useState<Palace | null>(null)
  const [player, setPlayer] = useState<Player | null>(null)

  const fetchUserTokenBalance = useCallback(async () => {
    if (wallet?.publicKey) {
      try {
        const vault = PublicKey.findProgramAddressSync(
          [Buffer.from("player_vault"), wallet.publicKey.toBytes()],
          PROGRAM_ID
        )[0]

        const balance = Number(
          (await connection.getTokenAccountBalance(vault)).value.amount
        )

        console.log(balance)
        setBalance(balance)
      } catch (e) {
        console.error(e)
      }
    }
  }, [wallet?.publicKey])

  const fetchUserPalace = useCallback(async () => {
    if (wallet?.publicKey) {
      try {
        const program = new Program(
          IDL,
          PROGRAM_ID,
          new AnchorProvider(connection, wallet, {})
        )

        const palaceAddress = PublicKey.findProgramAddressSync(
          [Buffer.from("player_palace"), wallet.publicKey.toBytes()],
          PROGRAM_ID
        )[0]

        const palace = await program.account.playerPalace.fetch(palaceAddress)
        setPalace(palace)
      } catch (e) {
        console.error(e)
      }
    }
  }, [wallet?.publicKey])

  const fetchPlayerAccount = useCallback(async () => {
    if (wallet?.publicKey) {
      try {
        const program = new Program(
          IDL,
          PROGRAM_ID,
          new AnchorProvider(connection, wallet, {})
        )

        const playerAddress = PublicKey.findProgramAddressSync(
          [Buffer.from("player"), wallet.publicKey.toBytes()],
          PROGRAM_ID
        )[0]

        const player = await program.account.player.fetch(playerAddress)
        setPlayer(player)
      } catch (e) {
        console.error(e)
      }
    }
  }, [wallet?.publicKey])

  useEffect(() => {
    fetchUserTokenBalance()
  }, [fetchUserTokenBalance])

  useEffect(() => {
    fetchUserPalace()
  }, [fetchUserPalace])

  useEffect(() => {
    fetchPlayerAccount()
  }, [fetchPlayerAccount])

  useEffect(() => {
    if (wallet && connection) {
      const program = new Program(
        IDL,
        PROGRAM_ID,
        new AnchorProvider(connection, wallet, {})
      )

      setProgram(program)
    }
  }, [wallet])

  const handleSignupButtonClick = async () => {
    try {
      if (
        !wallet ||
        !wallet.signTransaction ||
        !program ||
        !wallet.publicKey ||
        !connection
      )
        throw new Error("Please, connect your wallet first.")

      const palaceAddress = PublicKey.findProgramAddressSync(
        [Buffer.from("player_palace"), wallet.publicKey?.toBytes()],
        PROGRAM_ID
      )[0]

      const ix = await program.methods
        .signUpPlayer()
        .accounts({
          playerPalace: palaceAddress,
        })
        .instruction()

      await signAndSendTransactionInstructions(connection, wallet, [ix])
    } catch (e) {
      console.error(e)
    } finally {
      fetchUserPalace()
      fetchPlayerAccount()
    }
  }

  const handleCollectTokensButtonClick = async () => {
    try {
      if (!wallet || !wallet.signTransaction || !program)
        throw new Error("Please, connect your wallet first.")

      if (!palace) throw new Error("Please, initialize your palace first.")

      const destination = wallet.publicKey
      const ata = await getAssociatedTokenAddress(mint, destination)
      const account = await program.provider.connection.getAccountInfo(ata)

      const ixs = []
      // create associated token account if it doesn't exist
      if (!account) {
        ixs.push(
          createAssociatedTokenAccountInstruction(
            wallet.publicKey,
            ata,
            destination,
            mint
          )
        )
      }

      ixs.push(
        await program.methods
          .collectPalaceTokens()
          .accounts({
            owner: wallet.publicKey,
          })
          .instruction()
      )

      const { blockhash, lastValidBlockHeight } = await connection
        .getLatestBlockhash()
        .then((res) => res)

      const vault = PublicKey.findProgramAddressSync(
        [Buffer.from("player_vault"), wallet.publicKey.toBytes()],
        PROGRAM_ID
      )[0]

      console.log(vault.toString())

      const message = new TransactionMessage({
        instructions: ixs,
        payerKey: wallet.publicKey,
        recentBlockhash: blockhash,
      }).compileToV0Message()

      const tx = new VersionedTransaction(message)

      toast("Please, sign the transaction")

      const signed = await wallet.signTransaction(tx)

      const txid = await connection.sendTransaction(signed, {})

      const confirmed = await connection.confirmTransaction({
        signature: txid,
        blockhash,
        lastValidBlockHeight,
      })

      if (confirmed.value.err) {
        throw new Error(confirmed.value.err.toString())
      }

      toast("Success!", { type: "success" })
    } catch (e) {
      console.error(e)
    } finally {
      fetchUserTokenBalance()
      fetchUserPalace()
    }
  }

  const handleCollectResourcesButtonClick = async () => {
    try {
      if (!balance) throw new Error("You don't have any coins")
      if (!wallet || !program)
        throw new Error("Please, connect your wallet first.")

      const ixs = [
        await program.methods
          .collectPlayerResources()
          .accounts({
            owner: wallet.publicKey,
          })
          .instruction(),
      ]

      await signAndSendTransactionInstructions(connection, wallet, ixs)
    } catch (e) {
      console.error(e)
    } finally {
      fetchPlayerAccount()
    }
  }

  const handleUpgradePalaceButtonClick = async () => {
    try {
      if (!balance) throw new Error("You don't have any coins")
      if (!wallet || !program)
        throw new Error("Please, connect your wallet first.")

      const ixs = [
        await program.methods
          .upgradePlayerPalace()
          .accounts({
            owner: wallet.publicKey,
          })
          .instruction(),
      ]

      await signAndSendTransactionInstructions(connection, wallet, ixs)
    } catch (e) {
      console.error(e)
    } finally {
      fetchUserTokenBalance()
      fetchUserPalace()
      fetchPlayerAccount()
    }
  }

  const handleHireButtonClick = async (item: string, amount: number = 1000) => {
    try {
      if (!balance) throw new Error("You don't have any coins")

      if (!wallet || !program)
        throw new Error("Please, connect your wallet first.")

      const ixs = [
        await program.methods
          .purchaseMerchantItem(item, new BN(amount))
          .accounts({
            owner: wallet.publicKey,
          })
          .instruction(),
      ]

      await signAndSendTransactionInstructions(connection, wallet, ixs)
    } catch (e) {
      console.error(e)
    } finally {
      fetchUserTokenBalance()
      fetchUserPalace()
      fetchPlayerAccount()
    }
  }

  return {
    program,
    balance,
    palace,
    player,
    handleSignupButtonClick,
    handleCollectTokensButtonClick,
    handleCollectResourcesButtonClick,
    handleUpgradePalaceButtonClick,
    handleHireButtonClick,
  }
}
