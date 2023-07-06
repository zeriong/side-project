import axios from "axios";
// @ts-ignore
import css from 'dom-css';

export const printElapsedTime = (date: string | Date) => {
    const start = new Date(date);
    const end = new Date();

    const diff = (end.getTime() - start.getTime()) / 1000;

    const times = [
        { name: '년', milliSeconds: 60 * 60 * 24 * 365 },
        { name: '개월', milliSeconds: 60 * 60 * 24 * 30 },
        { name: '일', milliSeconds: 60 * 60 * 24 },
        { name: '시간', milliSeconds: 60 * 60 },
        { name: '분', milliSeconds: 60 },
    ];

    for (const value of times) {
        const betweenTime = Math.floor(diff / value.milliSeconds);
        if (betweenTime > 0) return `${betweenTime}${value.name} 전`;
    }
    return '방금 전';
}

/** 커스텀스크롤 function */
export const getInnerHeight = (el: HTMLDivElement) => {
    const { clientHeight } = el;
    const { paddingTop, paddingBottom } = getComputedStyle(el);
    return clientHeight - parseFloat(paddingTop) - parseFloat(paddingBottom);
}

export const getInnerWidth = (el: HTMLDivElement) => {
    const { clientWidth } = el;
    const { paddingLeft, paddingRight } = getComputedStyle(el);
    return clientWidth - parseFloat(paddingLeft) - parseFloat(paddingRight);
}

let scrollbarWidth: boolean | number = false;

export const getScrollbarWidth = (cacheEnabled = true) => {
    if (cacheEnabled && scrollbarWidth !== false) return scrollbarWidth;
    if (typeof document !== 'undefined') {
        const div = document.createElement('div');
        css(div, {
            width: 100,
            height: 100,
            position: 'absolute',
            top: -9999,
            overflow: 'scroll',
            MsOverflowStyle: 'scrollbar',
        });
        document.body.appendChild(div);
        scrollbarWidth = div.offsetWidth - div.clientWidth;
        document.body.removeChild(div);
    } else scrollbarWidth = 0;
    return scrollbarWidth || 0;
}

export const isString = (maybe: string | number) => typeof maybe === 'string';
export const returnFalse = () => false;

export const getFirebaseData = async (): Promise<undefined | any> => {
    const FB_DB = String(process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL);
    const response = await axios.get(FB_DB);
    if (response.data) return response;
    else return undefined;
}

export const convertToSecond = (timeString:string) => {
    const time = String(timeString).split(':').map((time) => parseInt(time));

    if(time.length === 3) {
        return (time[0] * 3600) + (time[1] * 60) + time[2];
    }
    if (time.length === 2) {
        return (time[0] * 60) + time[1]
    }
}

// "PT7M24S"와 같은 ISO 8601형식의 신간을 바꿀때 사용
export const durationToSeconds = (duration: any) => {
    const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
    const hours = match[1] ? parseInt(match[1], 10) : 0;
    const minutes = match[2] ? parseInt(match[2], 10) : 0;
    const seconds = match[3] ? parseInt(match[3], 10) : 0;

    return hours * 3600 + minutes * 60 + seconds;
};