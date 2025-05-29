import { cn } from '@/modules/core/helpers/utils';

export const Logo = ({ children = 'Bookworms', className }) => {
    return <h1 className={cn('font-merriweather font-bold text-2xl', className)}>{children}</h1>;
};
