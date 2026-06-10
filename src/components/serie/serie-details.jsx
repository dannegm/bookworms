import { Link } from '@tanstack/react-router';

import { cn } from '@/helpers/utils';
import { keyCase } from '@/helpers/strings';
import { BookCover } from '@/components/book/book-cover';
import { Eyebrow, Divider } from '@/components/layout/primitives';

const SerieBookRow = ({ book }) => (
    <Link
        to='/book/$libid/$title'
        params={{ libid: String(book.libid), title: keyCase(book.title) }}
        className={cn(
            'group flex items-center gap-5 py-4 border-b border-border/60 -mx-1 px-1 rounded-sm',
            'hover:bg-brand/5 transition-colors',
        )}
    >
        <span className='font-merriweather text-xl leading-none text-brand/25 w-10 shrink-0 tabular-nums select-none text-right'>
            {book.serie_sequence}
        </span>

        <div className='w-14 shrink-0 rounded overflow-hidden shadow-sm'>
            <BookCover book={book} fluid />
        </div>

        <div className='flex-1 min-w-0'>
            <p className='font-merriweather font-normal text-[15px] leading-snug text-foreground line-clamp-2'>
                {book.title}
            </p>
            {book.authors?.length > 0 && (
                <p className='text-xs text-muted-foreground font-noto mt-1'>
                    {book.authors.map(a => a?.name ?? a).join(', ')}
                </p>
            )}
        </div>

        <span className='text-brand text-sm shrink-0 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all'>
            →
        </span>
    </Link>
);

export const SerieDetails = ({ className, serie }) => (
    <div className={cn('flex flex-col', className)}>
        <div className='flex flex-col gap-2 pb-6'>
            <Eyebrow>Serie</Eyebrow>
            <h1 className='font-merriweather font-normal text-[clamp(26px,6vw,40px)] leading-[1.15] text-foreground'>
                {serie.name}
            </h1>
            <p className='text-sm text-muted-foreground font-noto mt-1'>
                {serie.books.length} libros · {serie.views} vistas
            </p>
        </div>

        <Divider />

        <div className='flex flex-col pt-2'>
            {[...serie.books]
                .sort((a, b) => a.serie_sequence - b.serie_sequence)
                .map(book => (
                    <SerieBookRow key={book.libid} book={book} />
                ))}
        </div>
    </div>
);
