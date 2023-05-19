import { useState } from 'react';
import Share from "./share";
import {ShareIcon} from "../common/vectors";
const NavBar = () => {
    const [isOnCopy, setIsOnCopy] = useState<boolean>(false);

    const copyModalOn = () => setIsOnCopy(!isOnCopy);

    return (
        <div className='flex w-full justify-between items-center mb-25 px-13 pt-13'>
            <div className='relative flex w-full items-center h-35px'>
                <h1 className='absolute ml-4px font-bold text-24'>
                    Side Project
                </h1>
            </div>
            <div className='flex whitespace-nowrap items-center'>
                <ShareIcon onClick={copyModalOn}/>
            </div>
            <Share isOnCopy={isOnCopy} modalSwitch={copyModalOn} />
        </div>
    );
};

export default NavBar;