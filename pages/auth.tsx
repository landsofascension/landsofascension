"use client"
import React, { useEffect, useState } from "react"
import { useWallet } from "@solana/wallet-adapter-react"
import dynamic from "next/dynamic"
import { Tab, Tabs, TabList, TabPanel } from "react-tabs"
import "react-tabs/style/react-tabs.css"
import { toast } from "react-toastify"
import { Button, Flex, Heading, Input, Label, Text, Image } from "theme-ui"
import { useRouter } from "next/router"
import { getInitialAuthProps } from "@/utils/auth"
import useAuthorization from "@/hooks/useAuthorization"
import { callProgramMethod } from "@/lib/game_core"

type Props = {
  authorized: boolean | null
}

const WalletDisconnectButtonDynamic = dynamic(
  async () =>
    (await import("@solana/wallet-adapter-react-ui")).WalletDisconnectButton,
  { ssr: false }
)
const WalletMultiButtonDynamic = dynamic(
  async () =>
    (await import("@solana/wallet-adapter-react-ui")).WalletMultiButton,
  { ssr: false }
)

export default function Auth(props: Props) {
  const { push, reload } = useRouter()
  const { authorized } = useAuthorization(props.authorized)

  console.log(authorized)
  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const formData = new FormData(e.currentTarget)

      const username = formData.get("username")?.toString()
      const password = formData.get("password")?.toString()

      if (!username || !password) throw new Error("Please, fill all the fields")

      const { message, txId } = await callProgramMethod("signUpPlayer", {
        username,
        password,
      })

      toast(message, { type: "success" })
      console.log(txId)
    } catch (e) {
      console.error(e)

      toast(e + "", { type: "error" })
    }
  }

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const formData = new FormData(e.currentTarget)

      const username = formData.get("username")?.toString()
      const password = formData.get("password")?.toString()

      if (!username || !password) throw new Error("Please, fill all the fields")

      const resRaw = await fetch("/api/login", {
        method: "POST",
        body: JSON.stringify({
          username,
          password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })

      const resJson = await resRaw.json()

      if (!resRaw.ok) throw new Error(resJson.message)

      const { message } = resJson

      toast(message, { type: "success" })
      push("/game")
    } catch (e) {
      console.error(e)

      toast(e + "", { type: "error" })
    }
  }

  return (
    <Flex
      sx={{
        flexDirection: "column",
        alignItems: ["center"],
        justifyContent: "start",
        height: "100vh",
        width: "100vw",
        backgroundImage:
          'url("https://cdn.discordapp.com/attachments/1152274140141735936/1161472438501113886/bg-loa.jpg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        overflow: "auto",
        pt: ["0px", "32px"],
      }}
    >
      <Image
        src="https://cdn.discordapp.com/attachments/1152274140141735936/1161823697456332880/loa_title_dark.png"
        alt="Lands of Ascension"
        sx={{ width: ["100", "600px"], mx: ["8px", "0"] }}
      />
      <main>
        <Flex
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundImage:
              "url(https://cdn.discordapp.com/attachments/1152274140141735936/1162485742438719568/dark_box.png)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            padding: "16px",
            border: "3px solid #615819",
            borderRadius: "10px",
            maxWidth: "90vw",
          }}
        >
          <Flex
            sx={{
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              backgroundImage:
                "url(https://cdn.discordapp.com/attachments/1152274140141735936/1162405178545287208/no_border_sidebox.png)",

              backgroundSize: "cover",
              backgroundPosition: "center",
              padding: "16px",
              border: "3px solid #615819",
              borderRadius: "10px",
              mb: "16px",
            }}
          >
            <Text
              sx={{
                color: "#615819",
                fontSize: ["24px", "32px"],
                fontWeight: "bold",
                textShadow:
                  "1px 1px 0 black, -1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black",
                fontFamily: "devinne",
                textAlign: "center",
              }}
            >
              Sign up or login and Ascend!!
            </Text>
            <Text
              sx={{
                color: "#615819",
                backgroundColor: "rgb(0,0,0,0.7)",
                fontSize: ["16px", "24px"],
                fontWeight: "bold",
                borderRadius: "10px",
                p: "8px",
              }}
            >
              You are {authorized ? "logged in" : "logged out"}.
            </Text>
            {authorized === null ? "Loading..." : ""}
            {authorized && (
              <Button
                sx={{
                  width: ["163px", "163px"],
                  height: ["61px", "61px"],
                  backgroundColor: "transparent",
                  mb: ["0px", "16px"],
                }}
                onClick={async () => {
                  // remove cookie
                  await fetch("/api/logout")
                  reload()
                }}
              >
                <Image
                  src="https://cdn.discordapp.com/attachments/1152274140141735936/1162481368207470683/logout_button.png"
                  alt="Logout"
                  sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </Button>
            )}
          </Flex>
          <Tabs
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "390px",
              alignItems: "center",
              fontFamily: "devinne",
              fontSize: "24px",
              fontWeight: "bold",
            }}
          >
            <TabList>
              <Tab>Login</Tab>
              <Tab>Sign Up</Tab>
            </TabList>

            <TabPanel>
              <Heading
                sx={{
                  color: "#615819",
                  fontWeight: "bold",
                  fontFamily: "devinne",
                  fontSize: "48px",
                  textAlign: "center",
                  textShadow:
                    "1px 1px 0 black, -1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black",
                }}
              >
                Login
              </Heading>
              <Flex
                sx={{
                  flexDirection: "column",

                  color: "#615819",
                  fontWeight: "bold",
                  fontFamily: "devinne",
                  textShadow:
                    "1px 1px 0 black, -1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black",
                  alignItems: "center",
                }}
              >
                {" "}
                <form
                  onSubmit={handleLogin}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "16px",
                    width: "300px",
                  }}
                >
                  <Label
                    sx={{
                      fontSize: "24px",
                    }}
                  >
                    Username
                    <Input
                      sx={{
                        fontSize: "16px",
                      }}
                      type="text"
                      name="username"
                      placeholder="Username"
                    />
                  </Label>

                  <Label
                    sx={{
                      fontSize: "24px",
                    }}
                  >
                    Password
                    <Input
                      sx={{
                        fontSize: "16px",
                      }}
                      type="password"
                      name="password"
                      placeholder="Password"
                    />
                  </Label>
                  <Flex
                    sx={{
                      gap: "16px",
                      alignItems: "center",
                      "> button": {
                        flex: 1,
                      },
                    }}
                  >
                    <Button
                      sx={{
                        backgroundColor: "transparent",
                        mb: ["0px", "16px"],
                      }}
                      type="submit"
                    >
                      <Image
                        src="https://cdn.discordapp.com/attachments/1152274140141735936/1162473411809902702/login_button.png"
                        alt="Login"
                        sx={{
                          width: "50%",
                          height: "50%",
                          objectFit: "cover",
                        }}
                      />
                    </Button>
                  </Flex>
                </form>
                {/* <Text mt="8px">Or:</Text>
            <div>
              {!publicKey ? (
                <WalletMultiButtonDynamic
                  style={{
                    background: "#222",
                  }}
                >
                  Login with&nbsp;&nbsp;
                  <SolanaIcon />
                </WalletMultiButtonDynamic>
              ) : (
                <WalletDisconnectButtonDynamic
                  style={{
                    background: "#222",
                  }}
                />
              )}
            </div> */}
              </Flex>
            </TabPanel>
            <TabPanel>
              <Heading
                sx={{
                  color: "#615819",
                  fontWeight: "bold",
                  fontFamily: "devinne",
                  fontSize: "48px",
                  textAlign: "center",
                  textShadow:
                    "1px 1px 0 black, -1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black",
                }}
              >
                Sign up
              </Heading>

              <Flex
                sx={{
                  flexDirection: "column",
                  color: "#615819",
                  fontWeight: "bold",
                  fontFamily: "devinne",
                  textShadow:
                    "1px 1px 0 black, -1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black",
                }}
              >
                {" "}
                <form
                  onSubmit={handleSignUp}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "16px",
                    width: "300px",
                  }}
                >
                  <Label
                    sx={{
                      fontSize: "24px",
                    }}
                  >
                    Username
                    <Input
                      sx={{
                        fontSize: "16px",
                      }}
                      type="text"
                      name="username"
                      placeholder="Username"
                    />
                  </Label>

                  <Label
                    sx={{
                      fontSize: "24px",
                    }}
                  >
                    Password
                    <Input
                      sx={{
                        fontSize: "16px",
                      }}
                      type="password"
                      name="password"
                      placeholder="Password"
                    />
                  </Label>
                  <Flex
                    sx={{
                      gap: "16px",
                      alignItems: "center",
                      "> button": {
                        flex: 1,
                      },
                    }}
                  >
                    <Button
                      sx={{
                        backgroundColor: "transparent",
                        mb: ["0px", "16px"],
                      }}
                      type="submit"
                    >
                      <Image
                        src="https://cdn.discordapp.com/attachments/1152274140141735936/1162489014545289408/signup_button.png"
                        alt="Login"
                        sx={{
                          width: "50%",
                          height: "50%",
                          objectFit: "cover",
                        }}
                      />
                    </Button>
                  </Flex>
                </form>
                {/* <Text mt="8px">Or:</Text>
            <div>
              {!publicKey ? (
                <WalletMultiButtonDynamic
                  style={{
                    background: "#222",
                  }}
                >
                  Sign up with&nbsp;&nbsp;
                  <SolanaIcon />
                </WalletMultiButtonDynamic>
              ) : (
                <WalletDisconnectButtonDynamic
                  style={{
                    background: "#222",
                  }}
                />
              )}
            </div> */}
              </Flex>
            </TabPanel>
          </Tabs>
        </Flex>
      </main>
    </Flex>
  )
}

Auth.getInitialProps = getInitialAuthProps

export const SolanaIcon = () => (
  <svg width="96" fill="none" className="my-5" viewBox="0 0 323 48">
    <g clipPath="url(#clip0_174_4480)">
      <path
        fill="url(#paint0_linear_174_4480)"
        d="M54.27 37.84l-8.86 9.51a2.101 2.101 0 01-1.51.65h-42a1 1 0 01-.75-1.73l8.85-9.5a2.07 2.07 0 011.51-.66h42a1 1 0 01.76 1.73zm-8.86-19.13a2.06 2.06 0 00-1.51-.65h-42a1 1 0 00-.75 1.73l8.85 9.5a2.06 2.06 0 001.51.65h42a1 1 0 00.76-1.73l-8.86-9.5zM1.9 11.89h42a2.072 2.072 0 001.51-.66l8.86-9.5A1 1 0 0053.51 0h-42A2.1 2.1 0 0010 .65l-8.85 9.51a1 1 0 00.75 1.73z"
      ></path>
      <path
        fill="#fff"
        d="M105.47 20.3H83v-7.4h28.31V5.5H82.93a7.39 7.39 0 00-7.43 7.35v7.5a7.39 7.39 0 007.43 7.35h22.49v7.4H76v7.4h29.44a7.38 7.38 0 007.42-7.35v-7.5a7.378 7.378 0 00-7.39-7.35zM149 5.5h-22.55a7.39 7.39 0 00-7.45 7.35v22.3a7.39 7.39 0 007.43 7.35H149a7.382 7.382 0 007.42-7.35v-22.3a7.383 7.383 0 00-4.59-6.802A7.382 7.382 0 00149 5.5zm-.05 29.6H126.5V12.9h22.44l.01 22.2zM228 5.5h-22a7.393 7.393 0 00-7.43 7.35V42.5h7.48V30.34H228V42.5h7.48V12.85A7.38 7.38 0 00228 5.5zm0 17.44h-21.9v-10H228v10zM315.57 5.5h-22a7.385 7.385 0 00-5.238 2.136 7.389 7.389 0 00-2.192 5.214V42.5h7.48V30.34h21.9V42.5H323V12.85a7.386 7.386 0 00-7.43-7.35zm-.05 17.44h-21.9v-10h21.9v10zM272 35.1h-3L258.29 8.58a4.94 4.94 0 00-4.59-3.08H247a4.931 4.931 0 00-4.95 4.9v32.1h7.48V12.9h3l10.72 26.52a4.995 4.995 0 004.6 3.08h6.65a4.921 4.921 0 005-4.9V5.5H272v29.6zM170.55 5.5h-7.48v29.65a7.385 7.385 0 007.43 7.35H193v-7.4h-22.45V5.5z"
      ></path>
    </g>
    <defs>
      <linearGradient
        id="paint0_linear_174_4480"
        x1="5.4"
        x2="49.45"
        y1="49.14"
        y2="-0.51"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0.08" stopColor="#9945FF"></stop>
        <stop offset="0.3" stopColor="#8752F3"></stop>
        <stop offset="0.5" stopColor="#5497D5"></stop>
        <stop offset="0.6" stopColor="#43B4CA"></stop>
        <stop offset="0.72" stopColor="#28E0B9"></stop>
        <stop offset="0.97" stopColor="#19FB9B"></stop>
      </linearGradient>
      <clipPath id="clip0_174_4480">
        <path fill="#fff" d="M0 0H323V48H0z"></path>
      </clipPath>
    </defs>
  </svg>
)
