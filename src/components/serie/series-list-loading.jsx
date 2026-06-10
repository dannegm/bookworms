import { cn, getId } from '@/helpers/utils';
import { sequence } from '@/helpers/arrays';
import { random } from '@/helpers/maths';

import { Skeleton } from '@/ui/skeleton';

export const SeriesListLoading = ({ className, items = 6 }) => {
    const skeletonItems = sequence(items).map(() => ({
        key: getId(),
        width: random(40, 80),
    }));

    return (
        <div className={cn('grid grid-cols-1 sm:grid-cols-2 gap-x-6', className)}>
            {skeletonItems.map((item, index) => (
                <div
                    key={item.key}
                    className={cn(
                        'flex items-center gap-4 py-3',
                        index < items - 1 && 'border-b border-border/60',
                    )}
                >
                    <Skeleton className='w-7 h-5 shrink-0' />
                    <div className='flex-1 space-y-1.5'>
                        <Skeleton className='h-4' style={{ width: `${item.width}%` }} />
                        <Skeleton className='h-3 w-16' />
                    </div>
                </div>
            ))}
        </div>
    );
};
