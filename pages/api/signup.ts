// nextjs api
import { kv } from "@vercel/kv"
import { NextApiRequest, NextApiResponse } from "next"

export default async function SignUp(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { username, password } = req.body

  const exists = await kv.get(username)

  if (exists) {
    return res.status(400).json({ message: "User already exists" })
  }

  const response = await kv.set(username, password)

  res.status(200).json({ message: "User signed up!", response })
}
