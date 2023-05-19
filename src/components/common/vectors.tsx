import { SVGProps } from 'react';

export const ArrowBackIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' {...props} className="backMan">
        <path
            d='M22 10.7374V13.2626H6.84848L13.7929 20.2071L12 22L2 12L12 2L13.7929 3.79293L6.84848 10.7374H22Z'
            fill='currentColor'
        />
    </svg>
)
export const ShareIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' {...props} className="cursor-pointer">
        <path fillRule='evenodd' clipRule='evenodd' d='M3 13H4.44565V21.5666H20.5543V13H22V23H3V13Z' fill='white' />
        <path
            d='M13.3207 15L11.6793 15L11.6793 5.15152L7.1654 9.6654L6 8.5L12.5 2L19 8.5L17.8346 9.66541L13.3207 5.15152L13.3207 15Z'
            fill='currentColor'
        />
    </svg>
)
export const ScrollTopIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <g opacity=".95">
            <circle opacity=".85" cx="25" cy="25" r="25" fill="#000"/>
            <path d="M26.042 33.333h-2.084v-12.5l-5.729 5.73-1.479-1.48 8.25-8.25 8.25 8.25-1.48 1.48-5.728-5.73v12.5z" fill="#fff"/>
        </g>
    </svg>
)
export const TitleMoreIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" height="26" viewBox="0 96 960 960" width="26" {...props} className='fill-white'>
        <path d="M480 711 240 471l47.333-47.333L480 617.001l192.667-192.667L720 471.667 480 711Z"/>
    </svg>
)
export const TitleLessIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" height="26" viewBox="0 96 960 960" width="26" {...props} className='fill-white'>
        <path d="M287.333 711 240 663.667l240-240L720 663l-47.333 47.333L480 517.666 287.333 711Z"/>
    </svg>
)