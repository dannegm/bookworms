import { useQuery } from '@tanstack/react-query';

import { cn } from '@/helpers/utils';
import { thousands } from '@/helpers/strings';
import { getSummaries } from '@/services/bookworms';
import { Skeleton } from '@/ui/skeleton';
import { SearchBox } from '@/components/layout/search-box';
import { SearchChips } from '@/components/layout/search-chips';
import { Logo } from '@/components/layout/logo';

const HeroSubtitle = () => {
    const { data, isLoading } = useQuery(getSummaries());

    if (isLoading) return <Skeleton className='h-5 w-64 mb-6' />;
    if (!data) return null;

    return (
        <p className='text-[clamp(13px,3.5vw,15px)] text-muted-foreground italic font-merriweather mb-6'>
            {thousands(data.books)} títulos en español — gratis, sin registro.
        </p>
    );
};


const StatsGrid = () => {
    const { data, isLoading } = useQuery(getSummaries());

    if (isLoading) {
        return (
            <div className='grid grid-cols-3 border border-border rounded-xl overflow-hidden bg-card mb-9'>
                {[0, 1, 2].map(i => (
                    <div
                        key={i}
                        className={cn('px-3 py-4 text-center', i < 2 && 'border-r border-border')}
                    >
                        <Skeleton className='h-7 w-16 mx-auto mb-1' />
                        <Skeleton className='h-3 w-10 mx-auto' />
                    </div>
                ))}
            </div>
        );
    }

    if (!data) return null;

    const stats = [
        { value: thousands(data.books), label: 'Libros' },
        { value: thousands(data.authors), label: 'Autores' },
        { value: thousands(data.series), label: 'Series' },
    ];

    return (
        <div className='grid grid-cols-3 border border-border rounded-xl overflow-hidden bg-card mb-9'>
            {stats.map(({ value, label }, i) => (
                <div
                    key={label}
                    className={cn('px-3 py-4 text-center', i < 2 && 'border-r border-border')}
                >
                    <div className='font-merriweather text-[clamp(20px,5vw,26px)] font-normal text-foreground leading-none mb-1'>
                        {value}
                    </div>
                    <div className='text-[11px] uppercase tracking-[0.07em] text-muted-foreground font-noto'>
                        {label}
                    </div>
                </div>
            ))}
        </div>
    );
};

export const HomeHero = () => {
    return (
        <div className='w-main mx-auto px-5 pt-12'>
            <div className='w-9 h-0.75 bg-brand rounded-full mb-4.5' />
            <h1 className='mb-2'>
                <Logo className='text-[clamp(36px,10vw,56px)] leading-[1.05]' />
            </h1>

            <HeroSubtitle />

            <div className='mb-3'>
                <SearchBox variant='hero' />
            </div>

            <div className='mb-6'>
                <SearchChips />
            </div>


            <StatsGrid />
        </div>
    );
};
