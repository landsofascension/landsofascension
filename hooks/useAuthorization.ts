import { useEffect, useState } from "react"

export default function useAuthorization(
  initialAuthorized: boolean | null = null,
  initialUsername: string | null = null
) {
  const [authorized, setAuthorized] = useState<boolean | null>(
    initialAuthorized
  )
  const [username, setUsername] = useState<string | null>(initialUsername)

  useEffect(() => {
    const fetchAuthorization = async () => {
      const resRaw = await fetch("/api/check-auth", {
        credentials: "same-origin",
      })

      if (!resRaw.ok) {
        setAuthorized(false)
        return
      }

      const resJson = await resRaw.json()

      const { username } = resJson

      setUsername(username)
      setAuthorized(true)
    }

    if (initialAuthorized === null) {
      fetchAuthorization()
    }
  }, [initialAuthorized])

  return { authorized, username }
}
