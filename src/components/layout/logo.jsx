import { cn } from '@/helpers/utils';

export const Logo = ({ children = 'Bookworms', className }) => (
    <span className={cn('font-radley font-bold text-2xl text-foreground', className)}>
        {children}
    </span>
);
