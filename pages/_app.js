import { NextUIProvider } from '@nextui-org/react'
import '@/styles/globals.css'
import Head from "next/head"
import { I18NProvider } from '@/context/i18n'

export default function App({ Component, pageProps }) {
  return (
    <I18NProvider>
      <NextUIProvider>
        <Head>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Component {...pageProps} />
      </NextUIProvider>
    </I18NProvider>
  )
}
