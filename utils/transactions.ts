import { IDL } from "@/lib/types/game_core"
import { parseIdlErrors, translateError } from "@coral-xyz/anchor"
import { AnchorWallet } from "@solana/wallet-adapter-react"
import {
  Connection,
  TransactionInstruction,
  TransactionMessage,
  VersionedTransaction,
} from "@solana/web3.js"
import { toast } from "react-toastify"

// Builds a transaction, ask for signature, sends it to the network, and notifies the user.
export const signAndSendTransactionInstructions = async (
  connection: Connection,
  wallet: AnchorWallet,
  instructions: TransactionInstruction[]
) => {
  try {
    if (!wallet || !wallet.signTransaction)
      throw new Error("Please, connect your wallet first.")

    const ixs = instructions

    const { blockhash, lastValidBlockHeight } = await connection
      .getLatestBlockhash()
      .then((res) => res)

    const message = new TransactionMessage({
      instructions: ixs,
      payerKey: wallet.publicKey,
      recentBlockhash: blockhash,
    }).compileToV0Message()

    const tx = new VersionedTransaction(message)

    toast("Please, sign the transaction")
    const signed = await wallet.signTransaction(tx)

    const txid = await connection.sendTransaction(signed)

    const confirmed = await connection.confirmTransaction({
      signature: txid,
      blockhash,
      lastValidBlockHeight,
    })

    if (confirmed.value.err) {
      throw new Error(confirmed.value.err.toString())
    }

    toast("Success!", { type: "success" })

    return txid
  } catch (e) {
    console.error(e)

    // find error message in the error string
    const errorMsg = getErrorMessageFromError(e)

    const msg =
      errorMsg || "Something went wrong. Please, try again, or contact support."

    toast(msg, { type: "error" })

    throw msg
  }
}

const PROGRAM_ERRORS = parseIdlErrors(IDL)

const getErrorMessageFromError = (error: any) => {
  const programError = translateError(error, PROGRAM_ERRORS) + ""
  const errorMsg =
    programError?.split("Error Message: ")?.[1] || error.message || null

  return errorMsg
}
