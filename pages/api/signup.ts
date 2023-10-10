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

  const response = await kv.set(username, password)

  res.status(200).json({ message: "User signed up!", response })
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
