import { NextApiRequest, NextApiResponse } from "next"
import { sign } from "jsonwebtoken"
import { kv } from "@vercel/kv"

// Check if the username and password is correct and set a session cookie
export default async function POST(req: NextApiRequest, res: NextApiResponse) {
  const { username, password } = req.body

  const storedPassword = String(await kv.get(username))

  if (storedPassword !== null && storedPassword === password) {
    const user = {
      username,
      password,
    }

    // Secret key to sign the token
    const secretKey = process.env.JWT_SECRET as string

    // Create a JWT token
    const token = sign(user, secretKey, { expiresIn: "24h" }) // Expires in 24 hours

    res.setHeader(
      "Set-Cookie",
      "authToken=" +
        token +
        "; HttpOnly; Path=/; SameSite=Strict; Max-Age=86400"
    )

    res.status(200).json({ message: "Authentication successful", token })
  } else {
    res.status(401).json({ message: "Authentication failed" })
  }
}
