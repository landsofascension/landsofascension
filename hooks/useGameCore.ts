import { useCallback, useEffect, useMemo, useState } from "react"
import { useConnection } from "@solana/wallet-adapter-react"
import {
  AnchorProvider,
  BN,
  IdlAccounts,
  Program,
  Wallet,
} from "@coral-xyz/anchor"
import { GameCore, IDL } from "@/lib/types/game_core"
import { Keypair, PublicKey } from "@solana/web3.js"
import { toast } from "react-toastify"

import { callProgramMethod } from "@/lib/game_core"

export type Palace = IdlAccounts<typeof IDL>["playerPalace"]
export type Player = IdlAccounts<typeof IDL>["player"]

export const PROGRAM_ID = new PublicKey(
  "9LqUvkM7zkVqpYypCRsuh5KitHbZZFrcfwkRVgirnnUf"
)

export const mint = PublicKey.findProgramAddressSync(
  [Buffer.from("mint")],
  PROGRAM_ID
)[0]

export default function useGameCore(playerUserName?: string | null) {
  const { connection } = useConnection()
  const [program, setProgram] = useState<Program<GameCore> | null>(null)
  const [balance, setBalance] = useState(0)
  const [palace, setPalace] = useState<Palace | null>(null)
  const [player, setPlayer] = useState<Player | null | false>(null)

  const { playerAddress, playerVaultAddress, playerPalaceAddress } =
    useMemo(() => {
      if (playerUserName) {
        const playerAddress = PublicKey.findProgramAddressSync(
          [Buffer.from("player"), Buffer.from(playerUserName)],
          PROGRAM_ID
        )[0]

        const playerVaultAddress = PublicKey.findProgramAddressSync(
          [Buffer.from("player_vault"), playerAddress.toBytes()],
          PROGRAM_ID
        )[0]

        const playerPalaceAddress = PublicKey.findProgramAddressSync(
          [Buffer.from("player_palace"), playerAddress.toBytes()],
          PROGRAM_ID
        )[0]

        return {
          playerAddress,
          playerVaultAddress,
          playerPalaceAddress,
        }
      } else {
        return {
          playerAddress: null,
          playerVaultAddress: null,
          playerPalaceAddress: null,
        }
      }
    }, [playerUserName])

  const fetchUserTokenBalance = useCallback(async () => {
    if (playerVaultAddress) {
      try {
        const balance =
          Number(
            (await connection.getTokenAccountBalance(playerVaultAddress)).value
              .amount
          ) / 1e9

        setBalance(balance)

        return balance
      } catch (e) {
        console.error(e)
      }
    }
  }, [playerVaultAddress])

  const fetchUserPalace = useCallback(async () => {
    if (program && playerPalaceAddress) {
      try {
        const palace = await program.account.playerPalace.fetch(
          playerPalaceAddress
        )
        setPalace(palace)
      } catch (e) {
        console.error(e)
      }
    }
  }, [program, playerPalaceAddress])

  const fetchPlayerAccount = useCallback(async () => {
    if (program && playerAddress) {
      try {
        const player = await program.account.player.fetch(playerAddress)
        setPlayer(player)

        return player
      } catch (e) {
        setPlayer(false)
        console.error(e)
      }
    }
  }, [program, playerAddress])

  useEffect(() => {
    const program = new Program(
      IDL,
      PROGRAM_ID,
      new AnchorProvider(
        connection,
        {
          publicKey: Keypair.generate().publicKey,
        } as Wallet,
        {}
      )
    )

    setProgram(program)
  }, [])

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
    if (playerUserName && playerAddress && player === false) {
      alert(
        "Something is wrong with your account, please contact support, or try another account."
      )
    }
  }, [playerUserName, player, playerAddress])

  const handleCollectTokensButtonClick = async () => {
    try {
      if (!playerUserName) throw new Error("Please, login first.")

      const { message, txId } = await callProgramMethod("collectPalaceTokens", {
        username: playerUserName,
      })

      toast(message, { type: "success" })
    } catch (e) {
      console.error(e)
      toast(e + "", { type: "error" })
    } finally {
      fetchUserTokenBalance()
      fetchUserPalace()
    }
  }

  const handleCollectResourcesButtonClick = async () => {
    try {
      if (!playerUserName) throw new Error("Please, login first.")

      const { message, txId } = await callProgramMethod(
        "collectPlayerResources",
        {
          username: playerUserName,
        }
      )
      toast(message, { type: "success" })
    } catch (e) {
      console.error(e)
      toast(e + "", { type: "error" })
    } finally {
      fetchPlayerAccount()
    }
  }

  const handleUpgradePalaceButtonClick = async () => {
    try {
      if (!playerUserName) throw new Error("Please, login first.")

      const { message, txId } = await callProgramMethod("upgradePlayerPalace", {
        username: playerUserName,
      })

      toast(message, { type: "success" })
    } catch (e) {
      console.error(e)
      toast(e + "", { type: "error" })
    } finally {
      fetchUserTokenBalance()
      fetchUserPalace()
      fetchPlayerAccount()
    }
  }

  const handleHireButtonClick = async (item: string, amount: number = 1) => {
    try {
      if (!playerUserName) throw new Error("Please, login first.")

      const balance = await fetchUserTokenBalance()

      // check player tokens
      if (!balance || balance < 1) {
        throw new Error("You don't have enough VALOR.")
      }

      const { message, txId } = await callProgramMethod(
        "purchaseMerchantItem",
        {
          username: playerUserName,
          item,
          amount,
        }
      )

      toast(message, { type: "success" })
    } catch (e) {
      console.error(e)
      toast(e + "", { type: "error" })
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
    handleCollectTokensButtonClick,
    handleCollectResourcesButtonClick,
    handleUpgradePalaceButtonClick,
    handleHireButtonClick,
  }
}
