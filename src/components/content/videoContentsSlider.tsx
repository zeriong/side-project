import Slider from 'react-slick';
import React, {useEffect, useRef, useState} from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {useRouter} from 'next/router';
import {useDragUpAndDown} from '../../hook/useDragUpAndDown';
import DOMPurify from 'isomorphic-dompurify';
import CustomScroller from "../common/customScroller";
import {store} from "../../store";
import {setSliderIndex} from "../../store/content.slice";

export const VideoContentsSlider = (
    {
        currentContents,
        chapterSectionList,
        playerRef,
        playStart,
        currentProgress,
    }: any) => {

    const slider1 = useRef<Slider>(null);
    const slider2 = useRef<Slider>(null);
    const timer = useRef<NodeJS.Timer | null>(null);

    const { sliderIndex } = store.getState().content;

    const { insertOnTouchStart, insertOnMouseDown, dragStyle } = useDragUpAndDown();
    const router = useRouter();


    const [isTouchEnd, setIsTouchEnd] = useState<boolean>(false);
    const [isSame, setIsSame] = useState<any>([[{index:0}]]);
    const [changedIdx, setChangedIdx] = useState(0);

    const sliderSettings1 = {
        centerMode: true,
        centerPadding: '26px',
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        infinite: false,
        beforeChange: (current:number, next:number) => {
            setSliderIndex(next);
            slider2.current?.slickGoTo(next);
            slider1.current?.slickGoTo(sliderIndex);
        },
    };
    const sliderSettings2 = {
        centerMode: true,
        centerPadding: '0',
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        infinite: false,
        beforeChange:  (_:number, next:number) => {
            setSliderIndex(next);
            slider1.current?.slickGoTo(next);
        },
    };

    const followProgress = () => {
        slider1.current?.slickGoTo(sliderIndex);

        // 프로그레스바 빠르게 누를시 이동하지않는 버그 방지
        if (timer.current != null) {
            clearTimeout(timer.current);
            timer.current = null;
        }
        if (timer.current == null) {
            timer.current = setTimeout(()=> {
                slider1.current?.slickGoTo(sliderIndex);
            }, 500);
        }
    }

    const syncFromCloneProgressBar = () => {
        const currentChapter = chapterSectionList.filter((e:any) => {
            if (sliderIndex + 1 === e.index) return true
        });

        if (sliderIndex !== chapterSectionList.length) {
            playerRef.current?.seekTo(currentChapter[0]?.sectStart);
            setChangedIdx(sliderIndex);
        }

        // 가장처음 유튜브재생안하고 챕터넘길시 무한로딩버그방지
        if (playStart && !(playerRef.current.player.isPlaying)) return
        playerRef.current?.getInternalPlayer()?.playVideo();
    }

    const syncFromYoutubeProgressBar = (currentChapter: any) => {
        setIsSame(currentChapter);
        slider1.current?.slickGoTo(currentChapter[0]?.index-1);
    }

    const onTouchEnd = () => setIsTouchEnd(!isTouchEnd);

    useEffect(()=> followProgress() ,[sliderIndex]);

    useEffect(()=> {
        const currentChapter = chapterSectionList.filter((e:any) => {
            if (currentProgress >= e.sectStart && currentProgress < e.sectEnd) return true
        });

        if (isSame[0]?.index === currentChapter[0]?.index) return;

        syncFromYoutubeProgressBar(currentChapter);

    }, [currentProgress]);

    useEffect(() => {
        // index변경 없을시 재생reset방지
        if (changedIdx === sliderIndex) return;
        syncFromCloneProgressBar();
    }, [isTouchEnd]);

    return (
        <>
            <section
                className='w-full grow'
                onMouseUp={onTouchEnd}
                onTouchEnd={onTouchEnd}
            > {/* n줄요약 */}
                <Slider
                    {...sliderSettings1}
                    ref={slider1}
                    className='w-full h-full !overflow-visible'
                >
                    {currentContents?.chapter?.map((chapter:any,i:number) => (
                        <ContentCover
                            key={i}
                            currentContents={currentContents}
                            i={i}
                            currentIdx={sliderIndex}
                            chapter={chapter}
                            routerQuery={router.query['id']}
                        />
                    ))}
                    <ContentCover
                        isAbridged={true}
                        currentIdx={sliderIndex}
                        i={currentContents.chapter.length}
                        currentContents={currentContents}
                    />
                </Slider>
            </section>
            <section
                className='fixed w-full h-[calc(100%-16px)] z-20 ease-in-out bg-primary-dark-100 rounded-[18px] shadow-[0_5px_20px_rgba(0,0,0,1)]'
                style={{...dragStyle}}
            >
                <div
                    className='relative bg-primary-dark-100 w-full h-33px select-none rounded-t-[18px]'
                    onTouchStart={insertOnTouchStart}
                    onMouseDown={insertOnMouseDown}
                >
                    <p className='relative top-8px w-40px rounded-full h-4px bg-primary-gray-400 mx-auto'/>
                    <p className='absolute top-0 w-full h-80px z-20'/>
                </div>
                <Slider
                    {...sliderSettings2}
                    ref={slider2}
                    className='w-full h-[calc(100%-30px)]'
                > {/* 디테일 */}
                    {currentContents?.chapter?.map((chapter:any,i:number) => {
                        const totalIndex = currentContents.chapter.length + 1;
                        return (
                            <ContentDetailCover
                                key={i}
                                i={i}
                                totalIndex={totalIndex}
                                chapter={chapter}
                                currentContents={currentContents}
                                onTouchEnd={onTouchEnd}
                            />
                        )}
                    )}
                    <ContentDetailCover
                        isAbridged={true}
                        i={currentContents.chapter.length}
                        totalIndex={currentContents.chapter.length + 1}
                        currentContents={currentContents}
                        onTouchEnd={onTouchEnd}
                    />
                </Slider>
            </section>
        </>
    )
}

const ContentCover = (props: {currentIdx: number, i: number, chapter?: any, currentContents: any, routerQuery?: string[] | undefined | string, isAbridged?: boolean}) => {
    return (
        <li
            className={`relative w-full phone-media mobile-md:h-[400px] transition-all duration-300 rounded-[15px]
            py-24 bg-primary-dark-100 select-none list-none
            ${props.currentIdx === props.i ? 'scale-100' : 'scale-90'}`}
        >
            <CustomScroller>
                <div
                    className='w-full h-full px-16'
                >
                    <h1 className='text-center mb-16 font-bold text-17 tracking-[-0.9px]'>
                        {props.isAbridged ? props.currentContents?.abridgedShort.title : props.chapter?.coverTitle}
                    </h1>
                    <Image
                        src={ props.isAbridged ?
                            props.currentContents?.abridgedShort.img :
                            props.chapter?.coverImg }
                        alt='컨텐츠 커버이미지'
                        width={1000}
                        height={1000}
                        className='w-full mb-16 rounded-[10px]'
                        priority
                    />
                    <div className='z-10 tracking-[-0.9px] flex text-14'>
                        <div className='text-start text-white'>
                            <div dangerouslySetInnerHTML={{
                                __html: DOMPurify.sanitize(props.isAbridged ?
                                    props.currentContents?.abridgedShort.text :
                                    props.chapter?.coverText)
                            }}/>
                            {props.i === 0 && (
                                <div className='flex whitespace-nowrap text-11 justify-end font-thin text-primary-gray-300 mt-6'>
                                    <div className='flex items-center'>
                                        <p className='mr-5px text-primary-gray-300'>출처:</p>
                                        <p className='mr-3px'>
                                            {props.currentContents?.channelTitle}
                                        </p>
                                    </div>
                                    <Link href={'https://www.youtube.com/watch/' + props.routerQuery} target={'_blank'} className='font-semibold'>
                                        원본영상 보러가기
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </CustomScroller>
        </li>
    )
}
const ContentDetailCover = (props: {i: number, totalIndex: number, currentContents: any, chapter?: any, isAbridged?: boolean, onTouchEnd: any}) => {
    return (
        <li
            className='h-[calc(100%-30px)] relative list-none'
            onMouseUp={props.onTouchEnd}
            onTouchEnd={props.onTouchEnd}
        >
            <CustomScroller>
                <div className='bg-primary-dark-100 h-[calc(100%-30px)] px-16 border-x border-dashed border-primary-gray-500'>
                    <h1 className='text-center mb-16 font-bold text-17 tracking-[-0.9px]'>
                        {props.isAbridged ? (
                            <p className='pb-15px text-center border-b border-primary-gray-500 text-white font-bold tracking-wider'>
                                전체요약
                            </p>
                        ) : (
                            <p className='tracking-wider'>
                                상세보기
                            </p>
                        )}
                    </h1>
                    <h1 className='my-8px text-18 text-center'>
                        { props.isAbridged && props.currentContents?.abridgedTitle }
                    </h1>
                    <Image
                        src={ props.isAbridged ?
                            props.currentContents?.abridgedImg :
                            props.chapter?.detail.img }
                        alt={'디테일이미지'}
                        width={1000}
                        height={1000}
                        className='w-full mb-16 rounded-[10px]'
                    />
                    <div
                        dangerouslySetInnerHTML={ props.isAbridged ?
                            {__html: DOMPurify.sanitize(props.currentContents?.abridged)} :
                            {__html: DOMPurify.sanitize(props.chapter?.detail.text)} }
                    />
                </div>
            </CustomScroller>
        </li>
    )
}