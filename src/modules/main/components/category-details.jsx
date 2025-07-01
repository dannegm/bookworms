import { cn } from '@/modules/core/helpers/utils';

import { BooksList } from '@/modules/main/components/books-list';

export const CategoryDetails = ({ className, name, data = [] }) => {
    return (
        <div className={cn('flex flex-col gap-8', className)}>
            <BooksList books={data} />
        </div>
    );
};
