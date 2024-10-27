import IconWrapper from './icon-wrapper';

export default function BookRegular(props) {
    return (
        <IconWrapper {...props}>
            <rect width='256' height='256' fill='none' />
            <path
                d='M48,216a24,24,0,0,1,24-24H208V32H72A24,24,0,0,0,48,56Z'
                fill='none'
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='16'
            />
            <polyline
                points='48 216 48 224 192 224'
                fill='none'
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='16'
            />
        </IconWrapper>
    );
}
