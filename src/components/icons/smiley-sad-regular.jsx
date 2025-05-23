import IconWrapper from './icon-wrapper';

export default function SmileySadRegular(props) {
    return (
        <IconWrapper {...props}>
            <rect width='256' height='256' fill='none' />
            <circle
                cx='128'
                cy='128'
                r='96'
                fill='none'
                stroke='currentColor'
                strokeMiterlimit='10'
                strokeWidth='16'
            />
            <circle cx='92' cy='108' r='12' />
            <circle cx='164' cy='108' r='12' />
            <path
                d='M168,176c-8.3-14.35-22.23-24-40-24s-31.7,9.65-40,24'
                fill='none'
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='16'
            />
        </IconWrapper>
    );
}
