import { sequence } from '@/helpers/arrays';
import { random } from '@/helpers/maths';
import { cn, getId } from '@/helpers/utils';
import { Skeleton } from '@/ui/skeleton';

export const SeriesListLoading = ({ className, items = 8 }) => {
    const skeletonItems = sequence(items).map(() => ({
        key: getId(),
        width: random(100, 220),
    }));

    return (
        <div className={cn('flex flex-row flex-wrap gap-2 sm:gap-4', className)}>
            {skeletonItems.map(item => (
                <Skeleton
                    key={item.key}
                    className={cn('h-8 rounded-full', 'w-[calc(var(--width)*0.8)] sm:w-(--width)')}
                    style={{ '--width': `${item.width}px` }}
                />
            ))}
        </div>
    );
};
