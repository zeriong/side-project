import '../styles/globals.css'
import type { AppProps } from 'next/app'
import React, {ReactElement, ReactNode} from "react";
import Head from "next/head";
import {NextPage} from "next";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
    getLayout?: (page: ReactElement) => ReactNode;
}

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout;
}

export default function App({ Component, pageProps }: AppPropsWithLayout) {
    const getLayout = Component.getLayout ?? ((page) => page);

    return (
        <>
            <Head>
                <title>영상 핵심내용을 빠르고 쉽게!</title>
                <meta property='og:title' content='영상 핵심내용을 빠르고 쉽게!'></meta>
                <meta property='og:site_name' content='영상 핵심내용을 빠르고 쉽게!'></meta>
                <meta property='og:type' content='website'></meta>
            </Head>
            <div
                id="_frame"
                className="relative box-border w-[375px] h-[812px] overflow-hidden m-auto transform
                max-mobile-md:w-full max-mobile-md:h-full max-mobile-md:p-0 bg-primary-dark-400"
            >
                {getLayout(
                    <>
                        <Component {...pageProps} />
                    </>
                )}
            </div>
        </>
    )
}
