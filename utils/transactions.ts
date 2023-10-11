import { IDL } from "@/lib/types/game_core"
import { parseIdlErrors, translateError } from "@coral-xyz/anchor"
import {
  Connection,
  PublicKey,
  Signer,
  TransactionInstruction,
  TransactionMessage,
  VersionedTransaction,
} from "@solana/web3.js"

// Builds a transaction, signs or asks for a signature, and sends it to the network.
export const buildAndSendTransactionInstructions = async (
  connection: Connection,
  instructions: TransactionInstruction[],
  payerKey: PublicKey,
  {
    signers,
    signTransaction,
  }: {
    signers?: Signer[]
    signTransaction?: (
      transaction: VersionedTransaction
    ) => Promise<VersionedTransaction>
  }
) => {
  try {
    const { blockhash, lastValidBlockHeight } = await connection
      .getLatestBlockhash()
      .then((res) => res)

    const message = new TransactionMessage({
      instructions,
      payerKey,
      recentBlockhash: blockhash,
    }).compileToV0Message()

    let tx = new VersionedTransaction(message)

    if (signers) {
      tx.sign(signers)
    } else if (signTransaction) {
      tx = await signTransaction(tx)
    }

    const txid = await connection.sendTransaction(tx)

    const confirmed = await connection.confirmTransaction({
      signature: txid,
      blockhash,
      lastValidBlockHeight,
    })

    if (confirmed.value.err) {
      throw new Error(confirmed.value.err.toString())
    }

    return txid
  } catch (e) {
    console.error(e)

    // find error message in the error string
    const errorMsg = getErrorMessageFromError(e)

    const msg =
      errorMsg || "Something went wrong. Please, try again, or contact support."

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
