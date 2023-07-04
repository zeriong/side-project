import Image from 'next/image';
import Link from 'next/link';
import {useEffect, useRef, useState} from "react";
import {getYoutubeChannelData, getYoutubeVideoData} from "../../libs/youtube";
import {getFirebaseData, printElapsedTime} from "../../libs/common";
import {useSearchParams} from "next/navigation";

interface VideoList {
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

const MediaList = () => {
    const videoList = useRef<VideoList[]>([]);
    const [currentList, setCurrentList] = useState<VideoList[]>([]);
    const searchParams = useSearchParams();

    // useRef current에 데이터 캐싱 (페이징 추가시 필수)
    const cacheChannelData = useRef<{[key: string]: any}>({});

    const getChannelData = async (id: string): Promise<any | undefined> => {
        if (!cacheChannelData.current[id]) {
            cacheChannelData.current[id] = await getYoutubeChannelData(id);
        }
        return cacheChannelData.current[id];
    }

    const getVideoList = () => {
        (async () => {
            const res = await getFirebaseData(); // 파이어베이스 데이터로드
            if (res) {
                for (const row of res.data) {
                    const data: any = await getYoutubeVideoData(row.id); // argument = videoId in FB
                    if (data) {
                        const channelData: any = await getChannelData(data.snippet.channelId); // current캐싱
                        if (channelData) {
                            const newData: VideoList = {
                                id: data.id,
                                title: data.snippet.title,
                                publishedAt: data.snippet.publishedAt,
                                thumbnail: data.snippet.thumbnails?.medium.url, // data = youtube "video" api
                                channelId: data.snippet.channelId,
                                channelTitle: data.snippet.channelTitle,
                                channelThumbnail: channelData?.snippet.thumbnails.default?.url, // channelData = youtube "channel" api
                                free: row.free, // from firebase
                                category: row.category, // from firebase
                            };
                            setCurrentList((prev: VideoList[]) => [...prev, newData]);
                            videoList.current.push(newData);
                        }

                    }
                }
            }
        })()
    }

    useEffect(() => {
        // 리스트 중복 업데이트 방지
        if (!videoList.current[0]) getVideoList();
    }, []);

    useEffect(() => {
        const queryStr = searchParams.get('category');
        if (queryStr === null) setCurrentList(videoList.current);
        else {
            const filter = [...videoList.current].filter(list => list.category === queryStr);
            setCurrentList(filter);
        }
    },[searchParams]);

    return (
        <div className="px-16px">
            {currentList?.map((val:any, i:number) => {
                return (
                    <div
                        key={i}
                        className="w-full mb-20 bg-primary-dark-100 rounded-[15px]"
                    >
                        <Link
                            href={{ pathname:'/video', query: { id: `${val.id}`} }}
                        >
                            <Image
                                priority
                                src={val.thumbnail}
                                width={1000}
                                height={1000}
                                alt='썸네일'
                                className="w-full h-[193px] overflow-hidden rounded-t-[15px]"
                            />
                            <div className="w-full py-14 px-16">
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center w-full">
                                        <Image
                                            priority
                                            src={val.channelThumbnail}
                                            width={1000}
                                            height={1000}
                                            alt='프로필 이미지'
                                            className="mr-6 w-32 h-32 rounded-full"
                                        />
                                        <span className="text-15 font-[500] text-white">
                                            {val.channelTitle}
                                        </span>
                                    </div>
                                    <p className="py-5 px-10 text-13 text-white bg-primary-gray-500 rounded-[5px] whitespace-nowrap">
                                        {val.category}
                                    </p>
                                </div>
                                <div className="mt-12 mb-3 text-14 text-white">
                                    {val.title}
                                    <p className="text-12 font-[500] text-primary-gray-300 text-end mt-7">
                                        업로드 날짜: {printElapsedTime(val.publishedAt)}
                                    </p>
                                </div>
                                <div className="pt-10 w-full flex justify-between items-center border-t border-primary-gray-500">
                                    <p className="text-13 font-[500] text-primary-gray-300">
                                        {val.free ? '무료' : '유료'} &#183; {'5분'} 완독
                                    </p>
                                    <p className="text-13 font-[500] text-primary-gray-300">
                                        홍길동
                                    </p>
                                </div>
                            </div>
                        </Link>
                    </div>
                )
            })}
        </div>
    )
}

export default MediaList;