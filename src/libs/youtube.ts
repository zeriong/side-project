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
    if (response.data?.items[0]) {
        return response.data?.items[0];
    } else {
        return undefined;
    }
}

export const getYoutubeChannelData = async (channelId: string): Promise<any | undefined> => {
    const response = await instance.get("channels", {
        params: {
            part: 'snippet', // contentDetails,statistics,snippet 옵션으로 추가적인 데이터 조회 가능
            maxResults: 50,
            id: channelId,
        }
    });
    //console.log('getYoutubeChannelData: ', channelId);
    if (response.data?.items[0]) {
        return response.data?.items[0];
    } else {
        return undefined
    }
}

/*
# https://www.youtube.com/watch?v=HbMpCT-fPgQ 기준 정상적인 데이터
{
    "kind": "youtube#video",
    "etag": "D_De3zsi6Y75s6gVSFRgg5SY0lQ",
    "id": "HbMpCT-fPgQ",
    "snippet": {
        "publishedAt": "2023-03-11T06:53:37Z",
        "channelId": "UCcWBKOysWoMmGjmNkrd1uWg",
        "title": "무조건 설치해야하는 챗GPT 익스텐션 확장프로그램 필수 어플 7개ㅣ최신버전, 한글 번역, 노션, 영어공부, 템플릿, 명령어, 꿀팁까지!ㅣ챗gpt ep.1",
        "description": "안녕하세요, 친절황입니다!\n\n이번 영상에는 챗GPT와 함께 사용하면 좋은 #챗GPT익스텐션 과\n사용법, 주의점, 꿀팁을 알려드릴게요! \n다른 사람보다 더 효율적으로 사용할 수 있도록\n친절황이 여러분에게만 알려줄 알짜배기 정보를 가져왔으니\n다들 한-입 하세요! \n\n🎀 문의 :  kindhwangg@gmail.com\n\n00:00 설마 아직도..?\n00:30 ①. 웹챗GPT\n03:27 ②. 프롬프트지니\n04:38 ③. 챗GPT옵티마이저\n05:29 ④. 챗GPT프롬프트지니어스\n07:35 ⑤. AIPRM\n08:33 ⑥. 챗GPT투노션\n10:12 ⑦. 유튜브써머리위드챗GPT\n10:53 ⑧. 마지막 꿀팁",
        "thumbnails": {
            "default": {
                "url": "https://i.ytimg.com/vi/HbMpCT-fPgQ/default.jpg",
                "width": 120,
                "height": 90
            },
            "medium": {
                "url": "https://i.ytimg.com/vi/HbMpCT-fPgQ/mqdefault.jpg",
                "width": 320,
                "height": 180
            },
            "high": {
                "url": "https://i.ytimg.com/vi/HbMpCT-fPgQ/hqdefault.jpg",
                "width": 480,
                "height": 360
            },
            "standard": {
                "url": "https://i.ytimg.com/vi/HbMpCT-fPgQ/sddefault.jpg",
                "width": 640,
                "height": 480
            },
            "maxres": {
                "url": "https://i.ytimg.com/vi/HbMpCT-fPgQ/maxresdefault.jpg",
                "width": 1280,
                "height": 720
            }
        },
        "channelTitle": "친절한황사장",
        "tags": [
            "챗GPT",
            "챗GPT익스텐션",
            "챗GPT확장프로그램",
            "챗GPT필수어플",
            "GPT",
            "챗GPT사용법",
            "챗GPT한글",
            "챗GPT활용",
            "챗GPT영어공부",
            "챗GPT한글사용법"
        ],
        "categoryId": "27",
        "liveBroadcastContent": "none",
        "localized": {
            "title": "무조건 설치해야하는 챗GPT 익스텐션 확장프로그램 필수 어플 7개ㅣ최신버전, 한글 번역, 노션, 영어공부, 템플릿, 명령어, 꿀팁까지!ㅣ챗gpt ep.1",
            "description": "안녕하세요, 친절황입니다!\n\n이번 영상에는 챗GPT와 함께 사용하면 좋은 #챗GPT익스텐션 과\n사용법, 주의점, 꿀팁을 알려드릴게요! \n다른 사람보다 더 효율적으로 사용할 수 있도록\n친절황이 여러분에게만 알려줄 알짜배기 정보를 가져왔으니\n다들 한-입 하세요! \n\n🎀 문의 :  kindhwangg@gmail.com\n\n00:00 설마 아직도..?\n00:30 ①. 웹챗GPT\n03:27 ②. 프롬프트지니\n04:38 ③. 챗GPT옵티마이저\n05:29 ④. 챗GPT프롬프트지니어스\n07:35 ⑤. AIPRM\n08:33 ⑥. 챗GPT투노션\n10:12 ⑦. 유튜브써머리위드챗GPT\n10:53 ⑧. 마지막 꿀팁"
        }
    },
    "contentDetails": {
        "duration": "PT11M40S",
        "dimension": "2d",
        "definition": "hd",
        "caption": "false",
        "licensedContent": true,
        "contentRating": {},
        "projection": "rectangular"
    },
    "statistics": {
        "viewCount": "175",
        "likeCount": "12",
        "favoriteCount": "0",
        "commentCount": "1"
    }
}
*/