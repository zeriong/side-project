import React, {useEffect, useRef, useState} from 'react';
import {convertToSecond, durationToSeconds, getFirebaseData} from "../../libs/common";
import "slick-carousel/slick/slick.css";
import Link from "next/link";
import ReactPlayer from "react-player";
import {ArrowBackIcon, ShareIcon, TitleLessIcon, TitleMoreIcon} from "../../components/common/vectors";
import Share from "../../components/home/share";
import {OnProgressProps} from "react-player/base";
import {VideoProgressBar} from "../../components/content/videoProgressBar";
import {VideoContentsSlider} from "../../components/content/videoContentsSlider";
import {GetServerSideProps, InferGetServerSidePropsType} from "next";
import {getYoutubeChannelData, getYoutubeVideoData} from "../../libs/youtube";
import axios from "axios";
import Head from "next/head";
import dynamic from "next/dynamic";
import {store} from "../../store";

export const getServerSideProps: GetServerSideProps<{ data: any, sectionList: any, duration: any }> = async (context) => {
    const { id } = context.query
    const res = await getFirebaseData();
    const data = await res.data.find((item:any) => item.id === id);
    const youtube = await getYoutubeVideoData(data.id);
    const channelData: any = await getYoutubeChannelData(youtube.snippet.channelId);
    data['channelTitle'] = youtube.snippet.channelTitle;
    data['title'] = youtube.snippet.title;
    data['publishedAt'] = youtube.snippet.publishedAt;
    data['thumbnail'] = youtube.snippet.thumbnails?.medium.url;
    data['channelId'] = channelData.id;

    const YOUTUBE_DETAILS = `https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id=${data.id}&key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}`;
    const getYoutube = await axios.get(YOUTUBE_DETAILS).then((e) => e.data.items[0].contentDetails.duration);
    const duration = durationToSeconds(getYoutube);

    const sectionList: any = [];
    data?.chapter.map((val:any,idx:number,arr:any)=>{
        let start:any = 0;
        let end:any = 0;

        if (idx === data.chapter.length) {
            start = convertToSecond(val.time);
            end = duration;
        } else {
            start = convertToSecond(val.time);
            end = convertToSecond(arr[1 + idx]?.time);
        }
        return sectionList.push({index: idx+1, sectStart: start, sectEnd: end || null});
    })

    return { props: { data, sectionList, duration } }
}

const Index = ({ data, sectionList, duration } : InferGetServerSidePropsType<typeof getServerSideProps>) => {
    const URL_LINK = useRef(`https://www.youtube.com/watch?v=${data.id}`);
    const playerRef = useRef<ReactPlayer>(null);
    const totalIndex = useRef(data.chapter.length + 1);

    const { sliderIndex } = store.getState().content;

    const [plus, setPlus] = useState<boolean>(false);
    const [isOnCopy, setIsOnCopy] = useState<boolean>(false);
    const [currentProgress ,setCurrentProgress] = useState<number>(0);
    const [playStart ,setPlayStart] = useState<boolean>(false); // 가장처음 유튜브재생안하고 clone progress 누를경우 무한로딩버그방지

    // dynamic매서드 사용시 playerRef 비정상적으로 작동하여 브라우저확인을 통해 동적 CSR
    const [hasWindow, setHasWindow] = useState(false);

    const titleMoreBtn = () => setPlus(!plus);
    const copyModalOn = () => setIsOnCopy(!isOnCopy);
    const getCurrentProgress = (opts: OnProgressProps) => setCurrentProgress(opts.playedSeconds);

    // react-player = ssr 불가능
    useEffect(() => {
       if (typeof window !== 'undefined') setHasWindow(true);
    }, [])

    return (
        <>
            <Head>
                <meta property="og:title" content={data.title}/>
                <meta property="og:image" content={data.thumbnail}/>
                <meta property="og:video" content={URL_LINK.current}/>
            </Head>
            <div className="relative w-full h-full overflow-hidden">
                <div className="flex flex-col w-full h-full overflow-hidden">
                    <section className="shrink w-full">
                        <header className='flex justify-between items-center h-48px w-full bg-black px-16px'>
                            <Link href={'/'}>
                                <ArrowBackIcon/>
                            </Link>
                            <div className='flex items-center'>
                                <ShareIcon onClick={copyModalOn}/>
                            </div>
                        </header>
                        <section className='relative w-full h-[211px] max-mobile-md:h-[26vh]'>
                            {
                                hasWindow &&
                                <ReactPlayer
                                    url={URL_LINK.current}
                                    width='100%'
                                    height='100%'
                                    controls={true}
                                    onProgress={getCurrentProgress}
                                    onStart={()=>setPlayStart(true)}
                                    className="react-player"
                                    ref={playerRef}
                                />
                            }
                        </section>
                        <article className="pt-12px w-full relative">
                            <div className='w-full h-24px relative'/>
                            <div
                                className={`absolute z-20 top-12px left-1/2 -translate-x-1/2 flex flex-col justify-between items-center w-[calc(100%-24px)] px-12px pb-10px transition-all duration-300
                                h-24px overflow-hidden rounded-[10px] border ${plus ? 'h-[100px] border-primary-gray-400 bg-primary-dark-100' : 'border-transparent'}`}
                            >
                                <div className="w-full flex justify-between">
                                    <p className={`w-[90%] text-16 text-white h-fit line-clamp-1 ${plus && "line-clamp-none"}`}>
                                        {data.title}
                                    </p>
                                    <button onClick={titleMoreBtn} className='w-24 h-fit'>
                                        { plus ? <TitleLessIcon/> : <TitleMoreIcon/> }
                                    </button>
                                </div>
                                <h2 className={`mt-2 text-13 text-primary-gray-400 ${plus ? "block" : "hidden"}`}>
                                    업데이트 {data?.publishedAt?.substring(0,10)}
                                </h2>
                            </div>
                            <div className='flex justify-between items-center  w-full mt-10 mb-12 px-16'>
                                <section className='flex relative flex-nowrap w-full h-5px items-center'>
                                    <VideoProgressBar
                                        chapterSectionList={sectionList}
                                        playerRef={playerRef}
                                        duration={duration}
                                        playStart={playStart}
                                        currentProgress={currentProgress}
                                    />
                                </section>
                                <div className='flex ml-10 text-15 min-w-[44px] w-44px'>
                                    <p>
                                        {sliderIndex + 1}
                                    </p>
                                    <div className={`flex ${sliderIndex === totalIndex.current ? 'text-white' : 'text-primary-gray-400'}`}>
                                        <p className='ml-2 mr-3'>
                                            /
                                        </p>
                                        <p>
                                            {totalIndex.current}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </article>
                    </section>
                    <section>
                        <VideoContentsSlider
                            playerRef={playerRef}
                            currentContents={data}
                            chapterSectionList={sectionList}
                            playStart={playStart}
                            currentProgress={currentProgress}
                        />
                    </section>
                </div>
                <div className='fixed z-20'>
                    <Share isOnCopy={isOnCopy} modalSwitch={copyModalOn}/>
                </div>
            </div>
        </>
    )
}

export default Index;