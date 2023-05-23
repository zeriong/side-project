import CategoriesList from "../components/home/categoriesList";
import NavBar from "../components/home/navBar";
import CustomScroller from "../components/common/customScroller";
import MediaList from "../components/home/mediaList";
import {ScrollTopIcon} from "../components/common/vectors";
import {useEffect, useRef, useState} from "react";

export default function Home() {
    const element = useRef<CustomScroller>(null);
    const [isFront, setIsFront] = useState(false);

    useEffect(() => {
        setIsFront(true);
    },[]);

    return (
        <>
            {isFront && (
                <div className='relative w-full h-full overflow-hidden box-border bg-primary-dark-400 '>
                    <header className='w-[375px] max-mobile-md:w-full fixed max-mobile-md:top-0 bg-primary-dark-400 z-10'>
                        <NavBar />
                        <CategoriesList />
                    </header>
                    <main className='absolute bottom-0 w-full h-[calc(100%-135px)] overflow-hidden'>
                        <div className="relative w-full h-full">
                            <CustomScroller ref={element}>
                                <MediaList/>
                                <button
                                    type='button'
                                    className="fixed bottom-16px right-16px"
                                    onClick={() => {
                                        if (!element.current) return
                                        element.current.scrollTop();
                                    }}
                                >
                                    <ScrollTopIcon/>
                                </button>
                            </CustomScroller>
                        </div>
                    </main>
                </div>
            )}
        </>
    )
}
