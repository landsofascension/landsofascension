// nextjs api
import { PROGRAM_ID } from "@/hooks/useGameCore"
import { IDL } from "@/lib/types/game_core"
import { buildAndSendTransactionInstructions } from "@/utils/transactions"
import { AnchorProvider, Program, Wallet } from "@coral-xyz/anchor"
import { bs58 } from "@coral-xyz/anchor/dist/cjs/utils/bytes"
import { Connection, Keypair } from "@solana/web3.js"
import { kv } from "@vercel/kv"
import { NextApiRequest, NextApiResponse } from "next"

export default async function SignUp(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { username, password } = req.body

    const exists = await kv.get(username)

    if (exists) {
      return res.status(400).json({ message: "User already exists" })
    }

    const isUsernameValid = getIsUsernameValid(username)

    if (!isUsernameValid) {
      return res.status(400).json({
        message:
          "Invalid username. Only letters allowed (uppercase and lowercase), and optionally a dot or underscore in the middle.",
      })
    }

    const isPasswordValid = getIsPasswordValid(password)

    if (!isPasswordValid) {
      return res.status(400).json({
        message:
          "Invalid password. It should include a mix of uppercase letters, lowercase letters, numbers, and special characters while also meeting a minimum length of 8 characters.",
      })
    }

    // const response = await kv.set(username, password)

    // Create on-chain vault from username.

    // KP from base58 secret key
    const gameAuthorityKeypair = Keypair.fromSecretKey(
      bs58.decode(process.env.GAME_AUTHORITY_PRIVATE_KEY as string)
    )

    const connection = new Connection(
      process.env.NEXT_PUBLIC_RPC_URL as string,
      "confirmed"
    )

    const gameAuthorityWallet = {
      publicKey: gameAuthorityKeypair.publicKey,
    } as Wallet

    const program = new Program(
      IDL,
      PROGRAM_ID,
      new AnchorProvider(connection, gameAuthorityWallet, {})
    )

    const ix = await program.methods
      .signUpPlayer(username)
      .accounts({
        signer: gameAuthorityKeypair.publicKey,
      })
      .signers([gameAuthorityKeypair])
      .instruction()

    const txid = await buildAndSendTransactionInstructions(
      connection,
      [ix],
      gameAuthorityKeypair.publicKey,
      {
        signers: [gameAuthorityKeypair],
      }
    )

    res.status(200).json({ message: "User signed up!", txid })
  } catch (e) {
    console.log(e)

    return res.status(500).json({ message: "Internal server error. " + e })
  }
}

function getIsUsernameValid(username: string) {
  /* 
    Regular expression to allow only letters (uppercase and lowercase),
    and it allows a dot or underscore in the middle:

    ^: Asserts the start of the string.
    [a-zA-Z]+: Matches one or more letters (uppercase or lowercase).
    ([._][a-zA-Z]+)?: This is an optional group that allows for a dot or underscore followed by one or more letters. The ? at the end makes the entire group optional.
    $: Asserts the end of the string.
  */
  const res = /^[a-zA-Z]+([._][a-zA-Z]+)?$/.exec(username)
  const valid = !!res
  return valid
}

/**
 * a strong password should include a mix of uppercase letters, lowercase letters, numbers,
 * and special characters while also meeting a minimum length requirement
 * 
 * (?=.*[A-Z]): At least one uppercase letter.
    (?=.*[a-z]): At least one lowercase letter.
    (?=.*\d): At least one digit.
    (?=.*[@#$%^&+=!]): At least one special character (you can add more special characters inside the brackets if needed).
    .{8,}: A minimum length of 8 characters (you can change this to your preferred minimum length).
 */
const getIsPasswordValid = (password: string) => {
  const res = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&+=!]).{8,}$/.exec(
    password
  )
  const valid = !!res
  return valid
}
