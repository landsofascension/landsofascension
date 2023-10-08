import { NextApiRequest, NextApiResponse } from "next"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Destroy session
  res.setHeader(
    "Set-Cookie",
    "authToken=; HttpOnly; Path=/; SameSite=Strict; Max-Age=-1"
  )
  res.status(200).json({ message: "Logout successful" })
}
