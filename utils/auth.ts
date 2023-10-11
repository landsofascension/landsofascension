import { verify } from "jsonwebtoken"
import { NextPageContext } from "next"

export type AuthProps = {
  authorized: boolean | null
  username: string
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

      const decoded = verify(authToken, process.env.JWT_SECRET as string) as {
        username: string
      }

      if (!decoded) return { authorized: false }

      return { authorized: true, username: decoded.username }
    } catch (e) {
      return { authorized: false }
    }
  } else {
    return { authorized: null }
  }
}

export function getIsUsernameValid(username: string) {
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
export const getIsPasswordValid = (password: string) => {
  const res = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&+=!]).{8,}$/.exec(
    password
  )
  const valid = !!res
  return valid
}
