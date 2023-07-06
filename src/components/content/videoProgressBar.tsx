import React, {useRef} from 'react';
import {setSliderIndex} from "../../store/content.slice";

export const VideoProgressBar = ({chapterSectionList, playerRef, duration, playStart, currentProgress}: any) => {
    const rectRef = useRef<SVGRectElement>(null);
    const progressRef = useRef<any>(null);

    const moveProgress = (e: React.MouseEvent<HTMLDivElement>) => {
        const barWidth = progressRef.current?.offsetWidth;
        const leftWidth = barWidth - (e.nativeEvent as MouseEvent).offsetX;
        const point = barWidth - leftWidth;
        const gauge: number = (point / barWidth) * duration;

        const currentChapter = chapterSectionList.filter((e:any)=> {
            if (gauge >= e.sectStart  &&  gauge < e.sectEnd) return true
        });

        let chapterIdx = currentChapter[0]?.index - 1;

        if (rectRef.current) rectRef.current.style.width = `${point}`;

        playerRef.current.seekTo(gauge);

        if (isNaN(chapterIdx)) chapterIdx = chapterSectionList.length - 1;

        setSliderIndex(chapterIdx);

        if (playStart && !(playerRef.current.player.isPlaying)) return

        playerRef.current?.getInternalPlayer().playVideo();
    }

    return (
        <>
            <p ref={progressRef} className='absolute w-full h-30px z-10' onClick={moveProgress}/>
            <svg className='w-full h-full bg-primary-gray-500'>
                <rect
                    ref={rectRef}
                    height={5}
                    x={0}
                    y={0}
                    className='fill-primary-300 transition-all duration-200'
                    style={{
                        width: `${(currentProgress / duration) * 100}%`
                    }}
                />
            </svg>
            {chapterSectionList?.map( (val:any, idx:any) => {
                let sec:any = chapterSectionList[idx].sectEnd;
                return (
                    <p
                        key={idx}
                        className='h-5px pl-2px bg-primary-dark-400 absolute last:bg-transparent'
                        style={{ left: `${sec / duration * 100}%` }}
                    />
                )
            })}
        </>
    )
}