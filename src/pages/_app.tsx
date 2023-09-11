import '../styles/globals.css'
import type { AppProps } from 'next/app'
import React, {ReactElement, ReactNode} from "react";
import Head from "next/head";
import {NextPage} from "next";
import {Provider} from "react-redux";
import {store} from "../store";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
    getLayout?: (page: ReactElement) => ReactNode;
}

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout;
}

export default function App({ Component, pageProps }: AppPropsWithLayout) {
    const getLayout = Component.getLayout ?? ((page) => page);

    return (
        <Provider store={store}>
            <Head>
                <meta httpEquiv="X-UA-Compatible" content="IE=edge"/>
                <meta httpEquiv="Subject" content="SideProject" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no"/>

                {/* <meta name="robots" content="all"/> */}
                {/* <meta name="keyword" content="유튜브컨텐츠요약, 유튜브요약, 영상요약, 컨텐츠요약"/> */}
                {/* <meta name='author' content='Copyright &copy; SideProject.com All Rights Reserved'/> */}

                <meta name='resource-type' content='Text/javascript'/>
                <meta property='og:type' content='website'/>
            </Head>
            <div
                id="_frame"
                className="relative box-border w-[375px] h-[812px] overflow-hidden m-auto transform
                max-mobile-md:w-full max-mobile-md:h-full max-mobile-md:p-0 bg-primary-dark-400"
            >
                {getLayout(
                    <Component {...pageProps} />
                )}
            </div>
        </Provider>
    )
}
