import { BookOpen, CircleUserRound, LibraryBig } from 'lucide-react';

import { cn } from '@/modules/core/helpers/utils';
import { thousands } from '@/modules/core/helpers/strings';
import { getSummaries } from '@/modules/core/services/bookworms';

import { DataLoader } from '@/modules/core/components/data-loader';
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

export const SummariesSuccess = ({ className, data }) => {
    return (
        <div
            className={cn(
                'flex flex-row gap-2 items-start text-sm text-gray-600 dark:text-gray-400',
                className,
            )}
        >
            <div className='flex flex-row gap-1 items-center [&_svg]:size-4'>
                <BookOpen />
                <span className=''>{thousands(data.books)}</span>
                <span className='hidden sm:block'>Libros</span>
            </div>
            <div className='flex flex-row gap-1 items-center [&_svg]:size-4'>
                <LibraryBig />
                <span className=''>{thousands(data.series)}</span>
                <span className='hidden sm:block'>Series</span>
            </div>
            <div className='flex flex-row gap-1 items-center [&_svg]:size-4'>
                <CircleUserRound />
                <span className=''>{thousands(data.authors)}</span>
                <span className='hidden sm:block'>Autores</span>
            </div>
        </div>
    );
};

export const Summaries = ({ className }) => {
    return (
        <DataLoader
            query={getSummaries()}
            tags={['summaries']}
            loader={<SummariesSkeleton className={className} />}
        >
            {({ data, error }) => !error && <SummariesSuccess data={data} className={className} />}
        </DataLoader>
    );
};
