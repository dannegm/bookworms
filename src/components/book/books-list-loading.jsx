import { cn, getId } from '@/helpers/utils';
import { sequence } from '@/helpers/arrays';

import { Skeleton } from '@/ui/skeleton';

export const BooksListLoading = ({ className, items = 8 }) => {
    return (
        <div className={cn('grid grid-cols-2 sm:grid-cols-4 gap-2.5', className)}>
            {sequence(items).map(() => (
                <div key={getId()} className='flex flex-col'>
                    <Skeleton className='w-full aspect-book rounded-lg mb-2' />
                    <Skeleton className='h-3.5 w-full mb-1.5' />
                    <Skeleton className='h-3 w-3/4' />
                </div>
            ))}
        </div>
    );
};
