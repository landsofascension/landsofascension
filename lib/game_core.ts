import { MethodsNamespace } from "@coral-xyz/anchor"
import { GameCore } from "./types/game_core"
import {
  CollectPalaceTokensData,
  PurchaseMerchantItemData,
  SignUpPlayerData,
} from "@/pages/api/call-program-method"

/**
 * This function is used to call the API which will call the Game Core program.
 */
export const callProgramMethod = async (
  method: keyof MethodsNamespace<GameCore>,
  data?: SignUpPlayerData | CollectPalaceTokensData | PurchaseMerchantItemData
) => {
  try {
    const resRaw = await fetch("/api/call-program-method", {
      method: "POST",
      body: JSON.stringify({
        method,
        data,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (!resRaw.ok) throw new Error("Error calling program method API")

    const { message, txId } = await resRaw.json()

    return { message, txId }
  } catch (e) {
    console.error(e)

    throw e
  }
}
