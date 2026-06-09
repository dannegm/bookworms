import { Link } from '@tanstack/react-router';

import { cn } from '@/helpers/utils';
import { BookCover } from '@/components/book/book-cover';
import { keyCase } from '@/helpers/strings';

export const CollectionBookItem = ({ book, className }) => (
    <Link
        to='/book/$libid/$title'
        params={{ libid: String(book.libid), title: keyCase(book.title) }}
        className={cn('group block', className)}
    >
        <BookCover book={book} fluid className='mb-2 transition-transform duration-150 group-hover:-translate-y-0.5' />
        <div className='text-xs font-medium text-foreground truncate font-noto'>{book.title}</div>
        <div className='text-[11px] text-muted-foreground truncate font-noto'>
            {book.authors?.join(', ')}
        </div>
    </Link>
);
