import { cn } from '@/modules/core/helpers/utils';
import { BookPreview } from '@/modules/main/components/book-preview';

export const BooksList = ({ className, books = [] }) => {
    return (
        <div className={cn(className)}>
            {!Boolean(books.length) && <p className='text-gray-500'>No se encontraron libros.</p>}

            <div className={cn('grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-8', className)}>
                {books.map(book => (
                    <BookPreview key={`book-${book.libid}`} book={book} />
                ))}
            </div>
        </div>
    );
};
