import { Tab } from "@headlessui/react";
import {useEffect, useState} from "react";
import {useHorizontalScroll} from "../../hook/useHorizontalScroll";
import {useRouter} from "next/router";

const classNames = (...classes: string[]) => {
  return classes.filter(Boolean).join(' ')
}
const CategoriesList = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();

  const sideScroll = useHorizontalScroll();

  let [categories] = useState({ titles: ['전체', 'IT', '주식', '부동산', '투자'] });

  useEffect(() => {
      (() => router.push({ pathname: '/' }))();
  },[]);

  return (
      <Tab.Group selectedIndex={selectedIndex} onChange={(i:number) => setSelectedIndex(i)}>
        <Tab.List className="mb-18 px-13 overflow-auto whitespace-nowrap scroll-hidden" ref={sideScroll}>
          {categories.titles?.map((cate: string, i:number) => (
              <Tab
                  onClick={async () => {
                      if (cate === '전체') await router.push({ pathname: '/' });
                      else await router.push({query: { category: cate }});
                  }}
                  key={'cateList'+i}
                  className={({ selected }) => (
                      classNames(
                          'mr-8 px-22 py-10 text-15 font-medium rounded-full text-white border tracking-wider',
                          'transition-all duration-300',
                          selected
                              ? 'bg-primary-300 border-transparent'
                              : 'bg-transparent border-primary-gray-500'
                      ))}
              >
                {cate}
              </Tab>
          ))}
        </Tab.List>
      </Tab.Group>
  )
}

export default CategoriesList;
