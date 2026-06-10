import { Link } from '@tanstack/react-router';

import { cn } from '@/helpers/utils';
import { keyCase } from '@/helpers/strings';
import { BookCover } from '@/components/book/book-cover';
import { Tooltip } from '@/ui/tooltip-simple';

export const BookRow = ({ className, book }) => (
    <Link
        to='/book/$libid/$title'
        params={{ libid: String(book.libid), title: keyCase(book.title) }}
        className={cn(
            'group flex items-center gap-3.5 py-3 border-b border-border/60 -mx-1 px-1 rounded-sm',
            'hover:bg-brand/5 transition-colors',
            className,
        )}
    >
        <div className='w-9 shrink-0 rounded overflow-hidden'>
            <BookCover book={book} fluid />
        </div>

        <div className='flex-1 min-w-0'>
            <Tooltip content={book.title} align='start'>
                <p className='font-noto text-sm font-medium text-foreground leading-tight line-clamp-2 text-pretty'>
                    {book.title}
                </p>
            </Tooltip>
            {book.authors?.length > 0 && (
                <p className='text-xs text-muted-foreground font-noto mt-0.5 truncate'>
                    {book.authors.map(a => a?.name ?? a).join(', ')}
                </p>
            )}
        </div>

        <span className='text-brand text-sm shrink-0 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all'>
            →
        </span>
    </Link>
);
