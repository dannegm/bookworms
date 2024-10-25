import type { ElementProps } from '@/types/common';

import { Merriweather } from 'next/font/google';
import { cn } from '@/helpers/utils';

const merriweather = Merriweather({
    weight: ['700'],
    subsets: ['latin'],
});

export interface LogoProps extends ElementProps {
    label?: string;
}

export default function Logo({ label = 'Bookworms', className }: LogoProps) {
    return <h1 className={cn(merriweather.className, 'text-4xl italic', className)}>{label}</h1>;
}
