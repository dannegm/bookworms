import { Merriweather } from 'next/font/google';
import { cn } from '@/helpers/utils';

const merriweather = Merriweather({
    weight: ['700'],
    subsets: ['latin'],
});

export default function Logo({ label = 'Bookworms', className }) {
    return (
        <h1 className={cn(merriweather.className, 'text-4xl italic', className)}>
            <a href='/'>{label}</a>
        </h1>
    );
}
