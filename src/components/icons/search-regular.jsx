import IconWrapper from './icon-wrapper';

export default function SearchRegular(props) {
    return (
        <IconWrapper {...props}>
            <rect width='256' height='256' fill='none' />
            <circle
                cx='112'
                cy='112'
                r='80'
                fill='none'
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='16'
            />
            <line
                x1='168.57'
                y1='168.57'
                x2='224'
                y2='224'
                fill='none'
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='16'
            />
        </IconWrapper>
    );
}
