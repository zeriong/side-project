import CategoriesList from "../components/home/categoriesList";
import NavBar from "../components/home/navBar";
import CustomScroller from "../components/common/customScroller";
import MediaList from "../components/home/mediaList";
import {ScrollTopIcon} from "../components/common/vectors";
import React, {useRef} from "react";
import {GetServerSideProps, InferGetServerSidePropsType} from "next";
import {getFirebaseData} from "../libs/common";
import {getYoutubeChannelData, getYoutubeVideoData} from "../libs/youtube";
import Head from 'next/head';
import {ParsedUrlQuery} from 'querystring';

export interface VideoList {
    id: string;
    title: string;
    publishedAt: string;
    thumbnail: string;
    channelId: string;
    channelTitle: string;
    channelThumbnail: string;
    free: boolean;
    category: string;
}

export const getServerSideProps: GetServerSideProps<{ data: VideoList[], query?: ParsedUrlQuery }> = async (context) => {
    const data: VideoList[] = [];
    const res = await getFirebaseData(); // 파이어베이스 데이터로드

    for (const row of res) {
        const youtube: any = await getYoutubeVideoData(row.id); // argument = videoId in FB
        const channelData: any = await getYoutubeChannelData(youtube.snippet.channelId);
        const newData = {
            id: youtube.id,
            title: youtube.snippet.title,
            publishedAt: youtube.snippet.publishedAt,
            thumbnail: youtube.snippet.thumbnails?.medium.url, // data = youtube "video" api
            channelId: youtube.snippet.channelId,
            channelTitle: youtube.snippet.channelTitle,
            channelThumbnail: channelData?.snippet.thumbnails.default?.url, // channelData = youtube "channel" api
            free: row.free, // from firebase
            category: row.category, // from firebase
        }
        data.push(newData);
    }

    return { props: { data, query: context.query } }
}

export default function Home({ data, query } : InferGetServerSidePropsType<typeof getServerSideProps>) {
    const element = useRef<CustomScroller>(null);

    return (
        <>
            <Head>
                <title>{!query?.category ? '영상 핵심내용을 빠르고 쉽게!' : `영상 핵심내용을 빠르고 쉽게! - ${query?.category}`}</title>
                <meta httpEquiv="Title" content="영상 핵심내용을 빠르고 쉽게!" />
                <meta name='description' content='유튜브 영상의 핵심내용을 챕터별로 빠르고 쉽게 즐기세요!'/>
                <meta property='og:title' content='영상 핵심내용을 빠르고 쉽게!'/>
                <meta property='og:description' content='유튜브 영상의 핵심내용을 챕터별로 빠르고 쉽게 즐기세요!'/>
                <meta property='og:site_name' content='영상 핵심내용을 빠르고 쉽게!'/>
            </Head>
            <div className='relative w-full h-full overflow-hidden box-border bg-primary-dark-400 '>
                <header className='w-[375px] max-mobile-md:w-full fixed max-mobile-md:top-0 bg-primary-dark-400 z-10'>
                    <NavBar />
                    <CategoriesList />
                </header>
                <main className='absolute bottom-0 w-full h-[calc(100%-135px)] overflow-hidden'>
                    <div className="relative w-full h-full">
                        <CustomScroller ref={element} universal={true}>
                            <MediaList data={data}/>
                            <button
                                type='button'
                                className="fixed bottom-16px right-16px"
                                onClick={() => {
                                    if (!element.current) return
                                    element.current.scrollTop();
                                }}
                            >
                                <ScrollTopIcon/>
                            </button>
                        </CustomScroller>
                    </div>
                </main>
            </div>
        </>
    )
}
