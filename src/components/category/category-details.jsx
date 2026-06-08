import { cn } from '@/helpers/utils';

import { BooksList } from '@/components/book/books-list';

export const CategoryDetails = ({ className, name, data = [] }) => {
    return (
        <div className={cn('flex flex-col gap-8', className)}>
            <BooksList books={data} />
        </div>
    );
};
