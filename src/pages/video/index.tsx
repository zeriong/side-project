import React, {useEffect, useRef, useState} from 'react';
import {convertToSecond, getFirebaseData} from "../../libs/common";
import {getYoutubeChannelData, getYoutubeVideoData} from "../../libs/youtube";
import {useRouter} from "next/router";
import "slick-carousel/slick/slick.css";
import Link from "next/link";
import ReactPlayer from "react-player";
import {ArrowBackIcon, ShareIcon, TitleLessIcon, TitleMoreIcon} from "../../components/common/vectors";
import Share from "../../components/home/share";
import {OnProgressProps} from "react-player/base";
import {VideoProgressBar} from "../../components/content/videoProgressBar";
import {VideoContentsSlider} from "../../components/content/videoContentsSlider";

const Index = () => {
    const router = useRouter();
    const [plus, setPlus] = useState<boolean>(false);
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [totalIndex, setTotalIndex] = useState<number>(0);
    const [currentContent, setCurrentContent] = useState<any>({});
    const [loading, setLoading] = useState<boolean>(true);
    const [isOnCopy, setIsOnCopy] = useState<boolean>(false);

    const titleMoreBtn = () => setPlus(!plus);
    const copyModalOn = () => setIsOnCopy(!isOnCopy);

    const getCurrentContents = () => {
        (async () => {
            const res = await getFirebaseData();
            if (res) {
                const current = res.data.find((item:any) => item.id === router.query['id']);
                if (current) {
                    const data = await getYoutubeVideoData(current.id)
                    if (data) {
                        const channelData: any = await getYoutubeChannelData(data.snippet.channelId);
                        if (channelData) {
                            current['channelTitle'] = data.snippet.channelTitle;
                            current['title'] = data.snippet.title;
                            current['publishedAt'] = data.snippet.publishedAt;
                            current['thumbnail'] = data.snippet.thumbnails?.medium.url;
                            current['channelId'] = channelData.id;
                            setCurrentContent(current);
                            setTotalIndex(current.chapter.length + 1);
                            setLoading(false);
                        }
                    }
                }
            }
        })()
    }

    const playerRef = useRef<ReactPlayer>(null);

    const [duration, setDuration] = useState<number>(0);
    const [currentProgress ,setCurrentProgress] = useState<number>(0);
    const [playStart ,setPlayStart] = useState<boolean>(false); // 가장처음 유튜브재생안하고 clone progress 누를경우 무한로딩버그방지

    const getDuration = (duration: number) => setDuration(duration);
    const getCurrentProgress = (opts: OnProgressProps) => setCurrentProgress(opts.playedSeconds);

    const [chapterSectionList, setChapterSectionList] = useState<{ index: number, sectStart: number, sectEnd:number }[]>([]);

    const getSectionList = (contents: typeof currentContent) => {
        contents?.chapter?.map((val:any,idx:number,arr:any)=>{
            let start:any = 0;
            let end:any = 0;

            if (idx === totalIndex-1) {
                start = convertToSecond(val.time);
                end = duration;
            } else {
                start = convertToSecond(val.time);
                end = convertToSecond(arr[1 + idx]?.time);
            }

            setChapterSectionList((p) => {
                return [...p, {index: idx+1, sectStart: start, sectEnd: end}]
            });
        });
    }

    useEffect(()=> {
        if (router.query['id']) getCurrentContents();
    },[router.query]);

    useEffect(()=>{
        if (currentContent && duration) {
            if (chapterSectionList.length === totalIndex) return
            getSectionList(currentContent);
        }
    },[currentContent, duration])

    return ( !loading ? (
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
                            <ReactPlayer
                                url={'https://www.youtube-nocookie.com/embed/' + currentContent?.id}
                                width='100%'
                                height='100%'
                                controls={true}
                                onProgress={getCurrentProgress}
                                onDuration={getDuration}
                                onStart={()=>setPlayStart(true)}
                                className="react-player"
                                ref={playerRef}
                            />
                        </section>
                        <article className="pt-12px w-full relative">
                            <div className='w-full h-24px relative'/>
                            <div
                                className={`absolute z-20 top-12px left-1/2 -translate-x-1/2 flex flex-col justify-between items-center w-[calc(100%-24px)] px-12px pb-10px transition-all duration-300
                                h-24px overflow-hidden rounded-[10px] border ${plus ? 'h-[100px] border-primary-gray-400 bg-primary-dark-100' : 'border-transparent'}`}
                            >
                                <div className="w-full flex justify-between">
                                    <p className={`w-[90%] text-16 text-white h-fit line-clamp-1 ${plus && "line-clamp-none"}`}>
                                        {currentContent.title}
                                    </p>
                                    <button onClick={titleMoreBtn} className='w-24 h-fit'>
                                        { plus ? <TitleLessIcon/> : <TitleMoreIcon/> }
                                    </button>
                                </div>
                                <h2 className={`mt-2 text-13 text-primary-gray-400 ${plus ? "block" : "hidden"}`}>
                                    업데이트 {currentContent?.publishedAt?.substring(0,10)}
                                </h2>
                            </div>
                            <div className='flex justify-between items-center  w-full mt-10 mb-12 px-16'>
                                <section className='flex relative flex-nowrap w-full h-5px items-center'>
                                    <VideoProgressBar
                                        chapterSectionList={chapterSectionList}
                                        playerRef={playerRef}
                                        duration={duration}
                                        setCurrentIndex={setCurrentIndex}
                                        currentIndex={currentIndex}
                                        playStart={playStart}
                                        currentProgress={currentProgress}
                                    />
                                </section>
                                <div className='flex ml-10 text-15 min-w-[44px] w-44px'>
                                    <p>
                                        {currentIndex + 1}
                                    </p>
                                    <div className={`flex ${currentIndex === totalIndex ? 'text-white' : 'text-primary-gray-400'}`}>
                                        <p className='ml-2 mr-3'>
                                            /
                                        </p>
                                        <p>
                                            {totalIndex}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </article>
                    </section>
                    <section>
                        <VideoContentsSlider
                            playerRef={playerRef}
                            setCurrentIdx={setCurrentIndex}
                            currentContents={currentContent}
                            currentIdx={currentIndex}
                            chapterSectionList={chapterSectionList}
                            playStart={playStart}
                            currentProgress={currentProgress}
                        />
                    </section>
                </div>
                <div className='fixed z-20'>
                    <Share isOnCopy={isOnCopy} modalSwitch={copyModalOn}/>
                </div>
            </div>
        ) : ('')
    )
}

export default Index;