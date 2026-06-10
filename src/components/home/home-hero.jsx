import { useState } from 'react';
import { Search } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';

import { cn } from '@/helpers/utils';
import { thousands } from '@/helpers/strings';
import { getSummaries, getSearchSuggestions } from '@/services/bookworms';
import { Skeleton } from '@/ui/skeleton';

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

const SearchChips = () => {
    const { data, isLoading } = useQuery(getSearchSuggestions());

    if (isLoading) {
        return (
            <div className='flex flex-wrap gap-2 mb-6'>
                {[80, 140, 100, 120, 90].map(w => (
                    <Skeleton key={w} className='h-[26px] rounded-full' style={{ width: w }} />
                ))}
            </div>
        );
    }

    if (!data?.length) return null;

    return (
        <div className='flex flex-wrap gap-2 mb-6'>
            {data.map(({ query }) => (
                <a
                    key={query}
                    href={`/search?q=${encodeURIComponent(query)}`}
                    className='text-xs text-foreground/70 border border-border rounded-full px-3 py-[5px] hover:text-brand hover:border-brand transition-all whitespace-nowrap font-noto'
                >
                    {query}
                </a>
            ))}
        </div>
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
            <div className='w-9 h-[3px] bg-brand rounded-full mb-[18px]' />
            <h1 className='font-merriweather font-normal text-[clamp(36px,10vw,56px)] leading-[1.05] text-foreground mb-2'>
                Bookworms
            </h1>

            <HeroSubtitle />

            <form action='/search' method='get' className='mb-3'>
                <div className='flex items-center gap-2 border-[1.5px] border-border rounded-xl pl-[14px] pr-[6px] focus-within:border-brand transition-colors duration-150'>
                    <Search className='text-muted-foreground size-[18px] shrink-0' />
                    <input
                        name='q'
                        type='text'
                        placeholder='Buscar por libro, autor o serie...'
                        className='flex-1 min-w-0 bg-transparent border-none outline-none text-[15px] text-foreground placeholder:text-muted-foreground py-[14px] font-noto caret-brand'
                    />
                    <button
                        type='submit'
                        className='text-brand hover:text-brand/80 text-sm font-medium py-[9px] px-2 shrink-0 transition-colors font-noto rounded-lg'
                    >
                        Buscar
                    </button>
                </div>
            </form>

            <SearchChips />


            <StatsGrid />
        </div>
    );
};
