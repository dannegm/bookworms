import { cn, getId } from '@/helpers/utils';
import { sequence } from '@/helpers/arrays';
import { random } from '@/helpers/maths';
import { Skeleton } from '@/ui/skeleton';
import { Divider } from '@/components/layout/primitives';

const SerieBookRowSkeleton = ({ titleWidth }) => (
    <div className='flex items-center gap-5 py-4 border-b border-border/60'>
        <Skeleton className='w-8 h-5 shrink-0' />
        <Skeleton className='w-14 aspect-book shrink-0 rounded' />
        <div className='flex-1 space-y-2'>
            <Skeleton className='h-4' style={{ width: `${titleWidth}%` }} />
            <Skeleton className='h-3 w-28' />
        </div>
    </div>
);

export const SerieDetailsLoading = ({ className, items = 10 }) => {
    const rows = sequence(items).map(() => ({ key: getId(), width: random(45, 85) }));

    return (
        <div className={cn('flex flex-col', className)}>
            <div className='flex flex-col gap-2 pb-6'>
                <Skeleton className='h-3 w-10' />
                <Skeleton className='h-10 w-2/3' />
                <Skeleton className='h-4 w-32 mt-1' />
            </div>

            <Divider />

            <div className='flex flex-col pt-2'>
                {rows.map(row => <SerieBookRowSkeleton key={row.key} titleWidth={row.width} />)}
            </div>
        </div>
    );
};
