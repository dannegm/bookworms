import { cn, getId } from '@/modules/core/helpers/utils';
import { sequence } from '@/modules/core/helpers/arrays';

import { BookPreviewLoading } from '@/modules/main/components/book-preview-loading';

export const BooksListLoading = ({ className, items = 6 }) => {
    const skeletonItems = sequence(items).map(() => ({
        key: getId(),
    }));

    return (
        <div className={cn('grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-8', className)}>
            {skeletonItems.map(item => (
                <BookPreviewLoading key={item.key} />
            ))}
        </div>
    );
};
