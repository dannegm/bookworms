import { BookOpen, CircleUserRound, LibraryBig } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';

import { cn } from '@/modules/core/helpers/utils';
import { thousands } from '@/modules/core/helpers/strings';
import { getSummaries } from '@/modules/core/services/bookworms';

import { Skeleton } from '@/modules/shadcn/ui/skeleton';

export const SummariesSkeleton = ({ className }) => {
    return (
        <div className={cn('flex flex-row gap-2 items-start', className)}>
            <Skeleton className='w-[72px] sm:w-[115px] h-6' />
            <Skeleton className='w-[48px] sm:w-[100px] h-6' />
            <Skeleton className='w-[64px] sm:w-[125px] h-6' />
        </div>
    );
};

export const Summaries = ({ className }) => {
    const { data, isLoading } = useQuery(getSummaries());

    if (isLoading) return <SummariesSkeleton className={className} />;
    if (!data) return null;

    return (
        <div
            className={cn(
                'flex flex-row gap-2 items-start text-sm text-gray-600 dark:text-gray-400',
                className,
            )}
        >
            <div className='flex flex-row gap-1 items-center [&_svg]:size-4'>
                <BookOpen />
                <span>{thousands(data.books)}</span>
                <span className='hidden sm:block'>Libros</span>
            </div>
            <div className='flex flex-row gap-1 items-center [&_svg]:size-4'>
                <LibraryBig />
                <span>{thousands(data.series)}</span>
                <span className='hidden sm:block'>Series</span>
            </div>
            <div className='flex flex-row gap-1 items-center [&_svg]:size-4'>
                <CircleUserRound />
                <span>{thousands(data.authors)}</span>
                <span className='hidden sm:block'>Autores</span>
            </div>
        </div>
    );
};
