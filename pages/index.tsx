"use client"
import type { NextPage } from "next"
import Head from "next/head"
import Link from "next/link"
import { Button } from "theme-ui"

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Lands of Ascension</title>
        <meta name="description" content="Ascend your land and conquer the " />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Link href="/game">
          <Button>Play</Button>
        </Link>
      </main>
    </>
  )
}

export default Home
