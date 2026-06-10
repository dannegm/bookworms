import { Link } from '@tanstack/react-router';
import { cn } from '@/helpers/utils';
import { BookCover } from '@/components/book/book-cover';
import { Tooltip } from '@/ui/tooltip-simple';
import { keyCase } from '@/helpers/strings';

export const BookPreview = ({ className, book }) => {
    return (
        <Link
            className={cn('flex flex-col items-center cursor-pointer', className)}
            to={`/book/${book.libid}/${keyCase(book.title)}`}
        >
            <div className='relative mx-auto'>
                <BookCover key={book.libid} book={book} width={140} />
            </div>

            <Tooltip content={book.title}>
                <h3 className='mt-4 text-center text-sm font-bold line-clamp-1'>{book.title}</h3>
            </Tooltip>

            {book?.authors && (
                <p className='text-center text-sm line-clamp-1'>{book.authors[0].name}</p>
            )}
        </Link>
    );
};
