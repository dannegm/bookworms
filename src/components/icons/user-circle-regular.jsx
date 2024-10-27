import IconWrapper from './icon-wrapper';

export default function UserCircleRegular(props) {
    return (
        <IconWrapper {...props}>
            <rect width='256' height='256' fill='none' />
            <circle
                cx='128'
                cy='128'
                r='96'
                fill='none'
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='16'
            />
            <circle
                cx='128'
                cy='120'
                r='40'
                fill='none'
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='16'
            />
            <path
                d='M63.8,199.37a72,72,0,0,1,128.4,0'
                fill='none'
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='16'
            />
        </IconWrapper>
    );
}
