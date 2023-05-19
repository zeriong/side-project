import React, {CSSProperties, useState} from "react";

export const useDragUpAndDown = () => {
    //style state
    const [position, setPosition] = useState('calc(-100% + 76px)');
    const [translateY, setTranslateY] = useState('');
    const [duration, setDuration] = useState('');

    /** style modifier 예시 style={{...dragStyle}} */
    const dragStyle:CSSProperties = {
        bottom: `${position}`,
        transform: `translateY(${translateY}px)`,
        transition: 'ease-in-out',
        transitionDuration: `${duration}ms`
    }

    /** 터치환경인 경우 onTouchStart이벤트에 insert */
    const insertOnTouchStart = (startE: any) => {
        setDuration('0');
        const touchMoveHandler = (moveE: any) => {
            const distanceY = moveE.changedTouches[0].pageY - startE.changedTouches[0].pageY;
            setTranslateY(`${distanceY}`)
        }

        const touchEndHandler = (endE: TouchEvent) => {
            setTranslateY('0');
            setDuration('300');

            if (Math.abs(startE.changedTouches[0].pageY - endE.changedTouches[0].pageY) >= 30) {
                if (startE.changedTouches[0].pageY > endE.changedTouches[0].pageY) {
                    setPosition('0');
                }
                if (startE.changedTouches[0].pageY < endE.changedTouches[0].pageY) {
                    setPosition('calc(-100% + 76px)');
                }
            }
            document.removeEventListener('touchmove', touchMoveHandler);
            document.removeEventListener('touchend', touchEndHandler);
        };

        document.addEventListener('touchmove',touchMoveHandler);
        document.addEventListener('touchend', touchEndHandler);
    };

    /** pc환경인 경우 onMouseDown 이벤트에 insert */
    const insertOnMouseDown = (startE: any) => {
        setDuration('0');
        const clickMoveHandler = (moveE: any) => {
            const distanceY = moveE.pageY - startE.pageY;
            setTranslateY(`${distanceY}`)
        }

        const mouseUpHandler = (endE: any) => {
            setTranslateY('0');
            setDuration('300');

            if (Math.abs(startE.pageY - endE.pageY) >= 30) {
                if (startE.pageY > endE.pageY) {
                    setPosition('0');
                }
                if (startE.pageY < endE.pageY) {
                    setPosition('calc(-100% + 76px)');
                }
            }
            document.removeEventListener('mousemove', clickMoveHandler);
            document.removeEventListener('mouseup', mouseUpHandler);
        };

        document.addEventListener('mousemove',clickMoveHandler);
        document.addEventListener('mouseup', mouseUpHandler);
    };

    return { insertOnTouchStart, dragStyle, insertOnMouseDown }
}