import Image from 'next/image';
import Link from 'next/link';
import {useEffect, useRef, useState} from "react";
import {useSearchParams} from "next/navigation";
import {InferGetServerSidePropsType} from "next";
import {getServerSideProps, VideoList} from "../../pages";
import {printElapsedTime} from "../../libs/common";

const MediaList = ({ data } : InferGetServerSidePropsType<typeof getServerSideProps>) => {
    const videoList = useRef<VideoList[]>(data);
    const [currentList, setCurrentList] = useState<VideoList[]>(data);
    const searchParams = useSearchParams();

    useEffect(() => {
        const queryStr = searchParams.get('category');
        if (queryStr === null) setCurrentList(videoList.current);
        else {
            const filter = [...videoList.current].filter(list => list.category === queryStr);
            setCurrentList(filter);
        }
        console.log('sdfsd')
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