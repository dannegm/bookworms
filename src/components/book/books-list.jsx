import { SearchX } from 'lucide-react';

import { cn } from '@/helpers/utils';

import { CollectionBookItem } from '@/components/book/collection-book-item';

const BooksEmpty = () => (
    <div className='flex items-center gap-4 px-4 py-5 rounded-xl border border-dashed border-border'>
        <div className='size-10 rounded-lg bg-muted flex items-center justify-center text-muted-foreground shrink-0'>
            <SearchX className='size-5 stroke-[1.5]' />
        </div>
        <div>
            <p className='text-sm font-medium text-foreground font-noto leading-tight'>
                Sin resultados
            </p>
            <p className='text-xs text-muted-foreground font-noto mt-0.5 leading-relaxed'>
                No encontramos libros que coincidan con tu búsqueda.
            </p>
        </div>
    </div>
);

export const BooksList = ({ className, books = [] }) => {
    if (!books.length) return <BooksEmpty />;

    return (
        <div className={cn('grid grid-cols-2 sm:grid-cols-4 gap-2.5', className)}>
            {books.map(book => (
                <CollectionBookItem key={`book-${book.libid}`} book={book} />
            ))}
        </div>
    );
};
