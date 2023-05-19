import '../styles/globals.css'
import type { AppProps } from 'next/app'
import React from "react";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  return (
      <>
          <Head>
              <title>영상 핵심내용을 빠르고 쉽게!</title>
              <meta property='og:title' content='영상 핵심내용을 빠르고 쉽게!'></meta>
              <meta property='og:site_name' content='영상 핵심내용을 빠르고 쉽게!'></meta>
              <meta property='og:type' content='website'></meta>
          </Head>
          <main
              id="_frame"
              className="relative box-border w-[375px] h-[812px] overflow-hidden m-auto transform
              max-mobile-md:w-full max-mobile-md:h-full max-mobile-md:p-0 bg-primary-dark-400"
          >
              <Component {...pageProps} />
          </main>
      </>
  )
}
