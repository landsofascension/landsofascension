import jwt from "jsonwebtoken"
import { NextApiRequest, NextApiResponse } from "next"

export default async function GET(req: NextApiRequest, res: NextApiResponse) {
  try {
    const token = req.cookies.authToken

    if (!token) throw new Error("No token provided")

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string)

    if (!decoded) {
      res.status(400).json({ message: "Expired" })
    } else {
      // If the token is valid, return some protected data.
      res.status(200).json({ message: "Authentication successful", token })
    }
  } catch (error) {
    console.error("Token verification failed", error)
    res.status(400).json({ message: "Unauthorized" })
  }
}
