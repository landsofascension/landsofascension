import { useEffect, useState } from "react"

export default function useAuthorization(
  initialAuthorized: boolean | null = null
) {
  const [authorized, setAuthorized] = useState<boolean | null>(
    initialAuthorized
  )

  useEffect(() => {
    const fetchAuthorization = async () => {
      const resRaw = await fetch("/api/check-auth", {
        credentials: "same-origin",
      })

      if (!resRaw.ok) {
        setAuthorized(false)
        return
      }

      setAuthorized(true)
    }

    if (initialAuthorized === null) {
      fetchAuthorization()
    } else {
    }
  }, [initialAuthorized])

  return { authorized }
}
