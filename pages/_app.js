import { NextUIProvider } from '@nextui-org/react'
import '@/styles/globals.css'
import Head from "next/head"

export default function App({ Component, pageProps }) {
  return (
    <NextUIProvider>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </NextUIProvider>
  )
}
