import { cn } from '@/helpers/utils';

export default function IconWrapper({
    children,
    size = '1.2em',
    viewBox = '0 0 256 256',
    className,
    ...props
}) {
    return (
        <svg
            height={size}
            width={size}
            viewBox={viewBox}
            fill='currentColor'
            aria-hidden='true'
            focusable='false'
            role='presentation'
            className={cn('mb-[-1px]', className)}
            {...props}
        >
            {children}
        </svg>
    );
}
