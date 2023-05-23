import React, { useState } from 'react';

const handleCopyClipBoard = (text: string) => {
    (async () => {
        try {
            await navigator.clipboard.writeText(text);
        } catch (e) { console.log(e) }
    })()
}

const Share = ({modalSwitch, isOnCopy}: any) => {
    const [copyBtn, setCopyBtn] = useState<boolean>(true);

    const CopyURL = () => {
        let currentUrl = window.document.location.href;
        handleCopyClipBoard(currentUrl);
        setCopyBtn(false);
        setTimeout(() => {
            modalSwitch(false);
            setTimeout(() => {
                setCopyBtn(true);
            }, 300);
        }, 1000);
    }

    return (
        <>
            <div
                className={`fixed left-0 w-full h-[164px] bg-primary-dark-200 pt-20 px-24 rounded-t-[46px] z-10
          transition-all duration-300 ${isOnCopy ? "-bottom-10px" : "-bottom-[170px]"}`}
            >
                <h1 className='ml-2px text-19 font-bold'>
                    Side Project
                </h1>
                {copyBtn ? (
                    <button className="mt-22px py-16px px-0 w-full text-16 font-500 text-white rounded-[8px] bg-primary-300 text-center h-54px" onClick={CopyURL}>
                        링크 복사하기
                    </button>
                ) : (
                    <button className="mt-22px py-16px px-0 w-full h-54px text-16 text-primary-gray-300 text-center rounded-[8px]">
                        링크가 복사되었습니다
                    </button>
                )}
            </div>
            <p
                className={`fixed w-full h-full left-0 top-0 bg-black transition-all duration-300
          ${isOnCopy ? "visible opacity-70" : "invisible opacity-0"}`}
                onClick={modalSwitch}
            />
        </>
    )
}

export default Share;