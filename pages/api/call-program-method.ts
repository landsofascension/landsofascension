// nextjs api
import { PROGRAM_ID } from "@/hooks/useGameCore"
import { GameCore, IDL } from "@/lib/types/game_core"
import { getIsPasswordValid, getIsUsernameValid } from "@/utils/auth"
import { buildAndSendTransactionInstructions } from "@/utils/transactions"
import {
  AnchorProvider,
  BN,
  MethodsNamespace,
  Program,
  Wallet,
} from "@coral-xyz/anchor"
import { bs58 } from "@coral-xyz/anchor/dist/cjs/utils/bytes"
import { Connection, Keypair, PublicKey } from "@solana/web3.js"
import { kv } from "@vercel/kv"
import { NextApiRequest, NextApiResponse } from "next"

export type SignUpPlayerData = {
  username: string
  password: string
}

export type CollectPalaceTokensData = {
  username: string
}

export type PurchaseMerchantItemData = {
  username: string
  item?: string
  amount?: number
}

/**
 * This API handler is used to call methods on the Solana program.
 *
 */
export default async function CallProgramMethodApiHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const {
      method,
    }: {
      method: keyof MethodsNamespace<GameCore>
    } = req.body

    // KP from base58 secret key
    const gameAuthorityKeypair = Keypair.fromSecretKey(
      bs58.decode(process.env.GAME_AUTHORITY_PRIVATE_KEY as string)
    )

    const connection = new Connection("http://localhost:8899", "confirmed")

    const gameAuthorityWallet = {
      publicKey: gameAuthorityKeypair.publicKey,
    } as Wallet

    const program = new Program(
      IDL,
      PROGRAM_ID,
      new AnchorProvider(connection, gameAuthorityWallet, {})
    )

    const {
      data: { username },
    }: {
      data:
        | SignUpPlayerData
        | CollectPalaceTokensData
        | PurchaseMerchantItemData
    } = req.body

    const playerAddress = PublicKey.findProgramAddressSync(
      [Buffer.from("player"), Buffer.from(username)],
      PROGRAM_ID
    )[0]

    switch (method) {
      case "signUpPlayer":
        const { password } = req.body.data as SignUpPlayerData
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

        await kv.set(username, password)

        // Create on-chain vault from username.

        const ix = await program.methods
          .signUpPlayer(username)
          .accounts({
            signer: gameAuthorityKeypair.publicKey,
          })
          .signers([gameAuthorityKeypair])
          .instruction()

        const txId = await buildAndSendTransactionInstructions(
          connection,
          [ix],
          gameAuthorityKeypair.publicKey,
          {
            signers: [gameAuthorityKeypair],
          }
        )

        return res.status(200).json({ message: "User signed up!", txId })
      case "collectPalaceTokens":
        const ixCollect = await program.methods
          .collectPalaceTokens()
          .accounts({
            player: playerAddress,
            signer: gameAuthorityKeypair.publicKey,
          })
          .signers([gameAuthorityKeypair])
          .instruction()

        const txidCollect = await buildAndSendTransactionInstructions(
          connection,
          [ixCollect],
          gameAuthorityKeypair.publicKey,
          {
            signers: [gameAuthorityKeypair],
          }
        )

        return res
          .status(200)
          .json({ message: "Tokens collected!", txId: txidCollect })

      case "collectPlayerResources":
        const ixResources = await program.methods
          .collectPlayerResources()
          .accounts({
            player: playerAddress,
            signer: gameAuthorityKeypair.publicKey,
          })
          .signers([gameAuthorityKeypair])
          .instruction()

        const txIdResources = await buildAndSendTransactionInstructions(
          connection,
          [ixResources],
          gameAuthorityKeypair.publicKey,
          {
            signers: [gameAuthorityKeypair],
          }
        )

        return res
          .status(200)
          .json({ message: "Resources collected!", txId: txIdResources })

      case "upgradePlayerPalace":
        const ixUpgrade = await program.methods
          .upgradePlayerPalace()
          .accounts({
            player: playerAddress,
            signer: gameAuthorityKeypair.publicKey,
          })
          .signers([gameAuthorityKeypair])
          .instruction()

        const txIdUpgrade = await buildAndSendTransactionInstructions(
          connection,
          [ixUpgrade],
          gameAuthorityKeypair.publicKey,
          {
            signers: [gameAuthorityKeypair],
          }
        )

        return res
          .status(200)
          .json({ message: "Palace upgraded!", txId: txIdUpgrade })

      case "purchaseMerchantItem":
        const { item, amount } = req.body.data as PurchaseMerchantItemData

        if (!item || !amount) throw new Error("Invalid item or amount")

        const ixPurchase = await program.methods
          .purchaseMerchantItem(item, new BN(amount))
          .accounts({
            player: playerAddress,
            signer: gameAuthorityKeypair.publicKey,
          })
          .signers([gameAuthorityKeypair])
          .instruction()

        const txIdPurchase = await buildAndSendTransactionInstructions(
          connection,
          [ixPurchase],
          gameAuthorityKeypair.publicKey,
          {
            signers: [gameAuthorityKeypair],
          }
        )

        return res
          .status(200)
          .json({ message: "Tokens collected!", txId: txIdPurchase })
      default:
        return res.status(500).json({ message: "Invalid program method" })
    }
  } catch (e) {
    console.log(e)

    return res.status(500).json({ message: "Internal server error. " + e })
  }
}
