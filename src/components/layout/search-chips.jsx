import { useQuery } from '@tanstack/react-query';

import { cn } from '@/helpers/utils';
import { getSearchSuggestions } from '@/services/bookworms';
import { Skeleton } from '@/ui/skeleton';

export const SearchChips = () => {
    const { data, isLoading } = useQuery(getSearchSuggestions());

    if (isLoading) {
        return (
            <div className='flex flex-wrap gap-2'>
                {[80, 140, 100, 120, 90].map(w => (
                    <Skeleton key={w} className='h-6.5 rounded-full' style={{ width: w }} />
                ))}
            </div>
        );
    }

    if (!data?.length) return null;

    return (
        <div className='flex flex-wrap gap-2'>
            {data.map(({ query }, i) => (
                <a
                    key={query}
                    href={`/search?q=${encodeURIComponent(query)}`}
                    className={cn(
                        'text-xs text-foreground/70 border border-border rounded-full px-3 py-1.25 hover:text-brand hover:border-brand transition-all whitespace-nowrap font-noto',
                        i >= 4 && 'hidden sm:inline-flex',
                    )}
                >
                    {query}
                </a>
            ))}
        </div>
    );
};
