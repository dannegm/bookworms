import { sequence } from '@/modules/core/helpers/arrays';
import { random } from '@/modules/core/helpers/maths';
import { cn, getId } from '@/modules/core/helpers/utils';
import { Skeleton } from '@/modules/shadcn/ui/skeleton';

export const SeriesListLoading = ({ className, items = 8 }) => {
    const skeletonItems = sequence(items).map(() => ({
        key: getId(),
        width: random(100, 220),
    }));

    return (
        <div className={cn('flex flex-row flex-wrap gap-4', className)}>
            {skeletonItems.map(item => (
                <Skeleton
                    key={item.key}
                    className='h-8 rounded-full'
                    style={{ width: `${item.width}px` }}
                />
            ))}
        </div>
    );
};
