import { cn, getId } from '@/helpers/utils';
import { sequence } from '@/helpers/arrays';
import { random } from '@/helpers/maths';

import { Skeleton } from '@/ui/skeleton';

const RowSkeleton = ({ index, items, width }) => (
    <div
        className={cn(
            'flex items-center gap-4 py-3',
            index < items - 1 && 'border-b border-border/60',
        )}
    >
        <Skeleton className='w-7 h-5 shrink-0' />
        <div className='flex-1 space-y-1.5'>
            <Skeleton className='h-4' style={{ width: `${width}%` }} />
            <Skeleton className='h-3 w-16' />
        </div>
    </div>
);

const CardSkeleton = () => (
    <div className='flex flex-col gap-0 px-4 pt-4 pb-4 rounded-xl bg-muted/20'>
        <Skeleton className='h-[2px] w-5 mb-3.5' />
        <Skeleton className='h-4 w-4/5 mb-1.5' />
        <Skeleton className='h-3.5 w-3/5 mb-3' />
        <Skeleton className='h-3 w-14' />
    </div>
);

export const SeriesListLoading = ({ className, items = 6, variant = 'rows' }) => {
    const skeletonItems = sequence(items).map(() => ({
        key: getId(),
        width: random(40, 80),
    }));

    if (variant === 'cards') {
        return (
            <div className={cn('grid grid-cols-2 sm:grid-cols-3 gap-2.5', className)}>
                {skeletonItems.map(item => <CardSkeleton key={item.key} />)}
            </div>
        );
    }

    return (
        <div className={cn('grid grid-cols-1 sm:grid-cols-2 gap-x-6', className)}>
            {skeletonItems.map((item, index) => (
                <RowSkeleton key={item.key} index={index} items={items} width={item.width} />
            ))}
        </div>
    );
};
