import axios from "axios";

const instance = axios.create({
    baseURL: "https://www.googleapis.com/youtube/v3",
    params: { key: process.env.NEXT_PUBLIC_YOUTUBE_API_KEY }
});

export const getYoutubeVideoData = async (channelId: string): Promise<any | undefined> => {
    const response = await instance.get("videos", {
        params: {
            part: 'snippet', // contentDetails,statistics,snippet 옵션으로 추가적인 데이터 조회 가능
            maxResults: 50,
            id: channelId,
        }
    });
    if (response.data?.items[0]) return response.data?.items[0];
    else return undefined;
}

export const getYoutubeChannelData = async (channelId: string): Promise<any | undefined> => {
    const response = await instance.get("channels", {
        params: {
            part: 'snippet', // contentDetails,statistics,snippet 옵션으로 추가적인 데이터 조회 가능
            maxResults: 50,
            id: channelId,
        }
    });
    if (response.data?.items[0]) return response.data?.items[0];
    else return undefined;
}