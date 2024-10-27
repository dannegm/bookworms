import IconWrapper from './icon-wrapper';

export default function BookOpenRegular(props) {
    return (
        <IconWrapper {...props}>
            <rect width='256' height='256' fill='none' />
            <path
                d='M128,88a32,32,0,0,1,32-32h72V200H160a32,32,0,0,0-32,32'
                fill='none'
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='16'
            />
            <path
                d='M24,200H96a32,32,0,0,1,32,32V88A32,32,0,0,0,96,56H24Z'
                fill='none'
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='16'
            />
        </IconWrapper>
    );
}
