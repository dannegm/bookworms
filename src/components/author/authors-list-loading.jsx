import { cn, getId } from '@/helpers/utils';
import { sequence } from '@/helpers/arrays';

import { Skeleton } from '@/ui/skeleton';

export const AuthorsListLoading = ({ className, items = 6 }) => {
    const skeletonItems = sequence(items).map(() => ({ key: getId() }));

    return (
        <div className={cn('grid grid-cols-2 sm:grid-cols-3 gap-2', className)}>
            {skeletonItems.map(item => (
                <div key={item.key} className='flex items-center gap-3 px-3 py-2.5 rounded-xl border border-border'>
                    <Skeleton className='size-9 rounded-full shrink-0' />
                    <div className='flex-1 space-y-1.5'>
                        <Skeleton className='h-3.5 w-4/5' />
                        <Skeleton className='h-3 w-1/2' />
                    </div>
                </div>
            ))}
        </div>
    );
};
