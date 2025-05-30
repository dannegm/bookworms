import { cn, getId } from '@/modules/core/helpers/utils';
import { sequence } from '@/modules/core/helpers/arrays';
import { random } from '@/modules/core/helpers/maths';

import { Skeleton } from '@/modules/shadcn/ui/skeleton';

export const AuthorsListLoading = ({ className, items = 6 }) => {
    const skeletonItems = sequence(items).map(() => ({
        key: getId(),
        width: random(140, 220),
    }));

    return (
        <div className={cn('flex flex-row flex-wrap gap-2 sm:gap-4', className)}>
            {skeletonItems.map(item => (
                <Skeleton
                    key={item.key}
                    className={cn(
                        'h-12 sm:h-16 rounded-full',
                        'w-[calc(var(--width)*0.8)] sm:w-(--width)',
                    )}
                    style={{ '--width': `${item.width}px` }}
                />
            ))}
        </div>
    );
};
