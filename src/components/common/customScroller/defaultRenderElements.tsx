// @ts-nocheck
import React, {useRef} from 'react';
import CustomScroller from "./index";

export function renderViewDefault(props) {
    return <div {...props} />;
}

export function renderTrackHorizontalDefault({ style, ...props }) {
    const finalStyle = {
        ...style,
        right: 2,
        bottom: 2,
        left: 2,
        borderRadius: 3,
    };
    return <div style={finalStyle} {...props} />;
}

export function renderTrackVerticalDefault({ style, ...props }) {
    const finalStyle = {
        ...style,
        right: 2,
        bottom: 2,
        top: 2,
        borderRadius: 3,
    };
    return <div style={finalStyle} {...props} />;
}

export function renderThumbHorizontalDefault({ style, ...props }) {
    const finalStyle = {
        ...style,
        cursor: 'pointer',
        borderRadius: 'inherit',
        backgroundColor: 'rgba(127,127,127,0.6)',
    };
    return <div style={finalStyle} {...props} />;
}

export function renderThumbVerticalDefault({ style, ...props }) {
    const finalStyle = {
        ...style,
        cursor: 'pointer',
        borderRadius: 'inherit',
        backgroundColor: 'rgba(127,127,127,0.6)',
    };

    return <div style={finalStyle} {...props} />;
}