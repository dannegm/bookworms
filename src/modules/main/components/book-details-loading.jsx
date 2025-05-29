import { cn } from '@/modules/core/helpers/utils';

import { Skeleton } from '@/modules/shadcn/ui/skeleton';

export const BookDetailsLoading = ({ className }) => {
    return (
        <div className={cn(className)}>
            <div className='flex gap-8 items-start'>
                <Skeleton className='w-[200px] aspect-book' />

                <div className='flex-1 flex flex-col gap-4'>
                    <Skeleton className='h-8 w-2/3' />
                    <Skeleton className='h-16 w-1/2 rounded-full' />
                    <Skeleton className='h-20 w-4/5' />
                    <Skeleton className='h-52 w-full' />
                    <Skeleton className='h-12 w-5/8 mt-8' />
                    <div className='flex flex-row gap-1'>
                        <Skeleton className='h-4 w-28 rounded-sm' />
                        <Skeleton className='h-4 w-18 rounded-sm' />
                    </div>
                    <Skeleton className='h-10 w-1/2 mt-8' />
                </div>
            </div>
        </div>
    );
};
