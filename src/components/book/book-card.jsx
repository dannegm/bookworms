import { Link } from '@tanstack/react-router';

import { cn } from '@/helpers/utils';
import { keyCase } from '@/helpers/strings';
import { BookCover } from '@/components/book/book-cover';
import { Tooltip } from '@/ui/tooltip-simple';

export const BookCard = ({ book, className }) => (
    <Link
        to='/book/$libid/$title'
        params={{ libid: String(book.libid), title: keyCase(book.title) }}
        className={cn('group block', className)}
    >
        <BookCover book={book} fluid className='mb-2 transition-transform duration-150 group-hover:-translate-y-0.5' />
        <Tooltip content={book.title}>
            <div className='text-xs font-medium text-foreground truncate font-noto'>{book.title}</div>
        </Tooltip>
        <div className='text-[11px] text-muted-foreground truncate font-noto'>
            {book.authors?.map(a => a?.name ?? a).join(', ')}
        </div>
    </Link>
);
