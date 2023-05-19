export default function Home() {
  return (
      <div className='relative w-full h-full overflow-hidden box-border bg-primary-dark-400 '>
          <header className='w-[375px] max-mobile-md:w-full fixed max-mobile-md:top-0 bg-primary-dark-400 z-10'>
              {/*<Navbar />*/}
              {/*<CategoriesList />*/}
              header
          </header>
          <main className='absolute bottom-0 w-full h-[calc(100%-135px)] overflow-hidden'>
              <div className="relative w-full h-full">
                  {/*<CustomScroller ref={element}>*/}
                  {/*    <MediaList />*/}
                  {/*    <button*/}
                  {/*        type='button'*/}
                  {/*        className="fixed bottom-16px right-16px"*/}
                  {/*        onClick={() => {*/}
                  {/*            element.current?.scrollTop(0);*/}
                  {/*        }}*/}
                  {/*    >*/}
                  {/*        <Image*/}
                  {/*            priority*/}
                  {/*            src={topScroll}*/}
                  {/*            width={50}*/}
                  {/*            height={50}*/}
                  {/*            alt="top scroll"*/}
                  {/*        />*/}
                  {/*    </button>*/}
                  {/*</CustomScroller>*/}
              </div>
          </main>
      </div>
  )
}
