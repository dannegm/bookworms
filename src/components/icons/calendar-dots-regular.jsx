import IconWrapper from './icon-wrapper';

export default function CalendarDotsRegular(props) {
    return (
        <IconWrapper {...props}>
            <rect width='256' height='256' fill='none' />
            <rect
                x='40'
                y='40'
                width='176'
                height='176'
                rx='8'
                fill='none'
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='16'
            />
            <line
                x1='176'
                y1='24'
                x2='176'
                y2='56'
                fill='none'
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='16'
            />
            <line
                x1='80'
                y1='24'
                x2='80'
                y2='56'
                fill='none'
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='16'
            />
            <line
                x1='40'
                y1='88'
                x2='216'
                y2='88'
                fill='none'
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='16'
            />
            <circle cx='128' cy='132' r='12' />
            <circle cx='172' cy='132' r='12' />
            <circle cx='84' cy='172' r='12' />
            <circle cx='128' cy='172' r='12' />
            <circle cx='172' cy='172' r='12' />
        </IconWrapper>
    );
}
