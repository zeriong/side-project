import { Tab } from "@headlessui/react";
import {useState} from "react";
import {useHorizontalScroll} from "../../hook/useHorizontalScroll";

const classNames = (...classes: string[]) => {
  return classes.filter(Boolean).join(' ')
}
const CategoriesList = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const sideScroll = useHorizontalScroll();

  let [categories] = useState({
    item1:[{title: '전체'}],
    item2: [{title: '경제'}],
    item3: [{title: '주식'}],
    item4: [{title: '부동산'}],
    item5: [{title: '투자'}],
  });

  return (
      <Tab.Group selectedIndex={selectedIndex} onChange={(i:number) => setSelectedIndex(i)}>
        <Tab.List className="mb-18 px-13 overflow-auto whitespace-nowrap scroll-hidden" ref={sideScroll}>
          {Object.values(categories).map((category: ({title: string})[], i:number) => (
              <Tab
                  key={'cateList'+i}
                  className={({ selected }) =>
                      classNames(
                          'mr-8 px-22 py-10 text-15 font-[500] rounded-full text-white border',
                          'transition-all duration-300',
                          selected
                              ? 'bg-primary-300 border-transparent'
                              : 'bg-transparent border-primary-gray-500'
                      )
                  }
              >
                {category[0].title}
              </Tab>
          ))}
        </Tab.List>
      </Tab.Group>
  )
}

export default CategoriesList;
