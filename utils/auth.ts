import { verify } from "jsonwebtoken"
import { NextPageContext } from "next"

export type AuthProps = {
  authorized: boolean | null
}

// auth check (server side only)
export const getInitialAuthProps = async (ctx: NextPageContext) => {
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
