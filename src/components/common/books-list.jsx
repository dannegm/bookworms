import { cn } from '@/helpers/utils';
import BookPreview from './book-preview';

export default function BooksList({ className, title, books = [], limit = undefined }) {
    const limitedBooks = limit ? books.slice(0, limit) : books;

    return (
        <div className={cn(className)}>
            <h1 className='text-gray-500 font-bold text-medium mb-4'>{title}</h1>

            {!Boolean(limitedBooks.length) && (
                <div className='block bg-slate-200 text-slate-700 py-4 px-6 text-small italic rounded-lg'>
                    <span>No se encontraron libros para esta búsqueda</span>
                </div>
            )}

            <div
                className={cn(
                    'grid grid-cols-2 justify-between gap-4',
                    'md:grid-cols-3',
                    'lg:gap-8',
                )}
            >
                {limitedBooks.map(book => (
                    <BookPreview key={book.libid} book={book} />
                ))}
            </div>
        </div>
    );
}
