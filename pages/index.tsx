"use client"
import { useAnchorWallet, useConnection } from "@solana/wallet-adapter-react"
import {
  PublicKey,
  TransactionMessage,
  VersionedTransaction,
} from "@solana/web3.js"
import type { NextPage, NextPageContext } from "next"
import dynamic from "next/dynamic"
import Head from "next/head"
import React, { useCallback, useEffect, useState } from "react"
import { AnchorProvider, BN, IdlAccounts, Program } from "@coral-xyz/anchor"
import { ToastContainer, toast } from "react-toastify"
import {
  createAssociatedTokenAccountInstruction,
  getAssociatedTokenAddress,
} from "@solana/spl-token"

import { signAndSendTransactionInstructions } from "@/utils/transactions"
import { GameCore, IDL } from "@/lib/types/game_core"
import { verify } from "jsonwebtoken"

const PROGRAM_ID = new PublicKey("9LqUvkM7zkVqpYypCRsuh5KitHbZZFrcfwkRVgirnnUf")

const toastId = "test"

const mint = PublicKey.findProgramAddressSync(
  [Buffer.from("mint")],
  PROGRAM_ID
)[0]

export type Palace = IdlAccounts<typeof IDL>["playerPalace"]
export type Player = IdlAccounts<typeof IDL>["player"]

const Home: NextPage = (props) => {
  const { connection } = useConnection()
  const [program, setProgram] = useState<Program<GameCore> | null>(null)
  const wallet = useAnchorWallet()
  const [balance, setBalance] = useState(0)
  const [palace, setPalace] = useState<Palace | null>(null)
  const [player, setPlayer] = useState<Player | null>(null)

  console.log(props.authorized)
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

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        {wallet && !player ? (
          <button
            style={{
              margin: "20px 0",
            }}
            onClick={async () => {
              try {
                if (!wallet || !wallet.signTransaction || !program)
                  throw new Error("Please, connect your wallet first.")

                const palaceAddress = PublicKey.findProgramAddressSync(
                  [Buffer.from("palace"), wallet.publicKey.toBytes()],
                  PROGRAM_ID
                )[0]

                const ix = await program.methods
                  .signUpPlayer()
                  .accounts({
                    playerPalace: palaceAddress,
                  })
                  .instruction()

                await signAndSendTransactionInstructions(connection, wallet, [
                  ix,
                ])
              } catch (e) {
                console.error(e)
              } finally {
                fetchUserPalace()
                fetchPlayerAccount()
              }
            }}
          >
            initialize
          </button>
        ) : null}

        {wallet && player ? (
          <>
            <h2>palace</h2>
            <div
              style={{
                display: "flex",
                gap: "16px",
              }}
            >
              <button
                style={{
                  margin: "20px 0",
                }}
                onClick={async () => {
                  try {
                    if (!wallet || !wallet.signTransaction || !program)
                      throw new Error("Please, connect your wallet first.")

                    if (!palace)
                      throw new Error("Please, initialize your palace first.")

                    const destination = wallet.publicKey
                    const ata = await getAssociatedTokenAddress(
                      mint,
                      destination
                    )
                    const account =
                      await program.provider.connection.getAccountInfo(ata)

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
                }}
              >
                collect tokens
              </button>
              <button
                style={{
                  margin: "20px 0",
                }}
                onClick={async () => {
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

                    await signAndSendTransactionInstructions(
                      connection,
                      wallet,
                      ixs
                    )
                  } catch (e) {
                    console.error(e)
                  } finally {
                    fetchPlayerAccount()
                  }
                }}
              >
                collect resources
              </button>
              <button
                style={{
                  margin: "20px 0",
                }}
                onClick={async () => {
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

                    await signAndSendTransactionInstructions(
                      connection,
                      wallet,
                      ixs
                    )
                  } catch (e) {
                    console.error(e)
                  } finally {
                    fetchUserTokenBalance()
                    fetchUserPalace()
                    fetchPlayerAccount()
                  }
                }}
              >
                upgrade palace
              </button>
            </div>
            <div
              style={{
                display: "flex",
                gap: "16px",
              }}
            >
              <h3>Palace level: {palace?.level}</h3>
              <h3>Tokens: {balance}</h3>
              <h3>Gold: {player?.gold.toNumber()}</h3>
              <h3>Lumber: {player?.lumber.toNumber()}</h3>
            </div>

            <h2>store</h2>
            <button
              style={{
                margin: "20px 0",
              }}
              onClick={async () => {
                try {
                  if (!balance) throw new Error("You don't have any coins")

                  if (!wallet || !program)
                    throw new Error("Please, connect your wallet first.")

                  const ixs = [
                    await program.methods
                      .purchaseMerchantItem("Miner", new BN(1000))
                      .accounts({
                        owner: wallet.publicKey,
                      })
                      .instruction(),
                  ]

                  await signAndSendTransactionInstructions(
                    connection,
                    wallet,
                    ixs
                  )
                } catch (e) {
                  console.error(e)
                } finally {
                  fetchUserTokenBalance()
                  fetchUserPalace()
                }
              }}
            >
              Buy 1000 Miner
            </button>
            <button
              style={{
                margin: "20px 0",
              }}
              onClick={async () => {
                try {
                  if (!balance) throw new Error("You don't have any coins")

                  if (!wallet || !program)
                    throw new Error("Please, connect your wallet first.")

                  const ixs = [
                    await program.methods
                      .purchaseMerchantItem("Lumberjack", new BN(1000))
                      .accounts({
                        owner: wallet.publicKey,
                      })
                      .instruction(),
                  ]

                  await signAndSendTransactionInstructions(
                    connection,
                    wallet,
                    ixs
                  )
                } catch (e) {
                  console.error(e)
                } finally {
                  fetchUserTokenBalance()
                  fetchUserPalace()
                }
              }}
            >
              Buy 1000 Lumberjack
            </button>
          </>
        ) : null}
      </main>
    </>
  )
}

Home.getInitialProps = async (ctx: NextPageContext) => {
  // server side
  if (ctx.req) {
    try {
      const cookies = ctx.req.headers.cookie
      const authToken = cookies
        ?.split(";")
        .find((c) => c.trim().startsWith("authToken="))
        ?.split("=")[1]

      if (!authToken) return { authorized: false }

      const decoded = verify(authToken, process.env.JWT_SECRET as string)

      if (!decoded) return { authorized: false }
    } catch (e) {
      return { authorized: false }
    }

    return { authorized: true }
  } else {
    return { authorized: null }
  }
}

export default Home
