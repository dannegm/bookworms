import { cn } from '@/helpers/utils';

import { AuthorAvatar } from '@/components/author/author-avatar';
import { BookCard } from '@/components/book/book-card';
import { BookRow } from '@/components/book/book-row';
import { Eyebrow, Divider } from '@/components/layout/primitives';

const AuthorBooks = ({ books = [] }) => {
    const sorted = [...books].sort((a, b) => (a.serie_sequence ?? Infinity) - (b.serie_sequence ?? Infinity));
    const featuredCount = sorted.length > 8 ? 8 : 4;
    const featured = sorted.slice(0, featuredCount);
    const rows = sorted.slice(featuredCount);

    return (
        <div className='flex flex-col gap-6'>
            <div className='grid grid-cols-2 sm:grid-cols-4 gap-2.5'>
                {featured.map(book => <BookCard key={book.libid} book={book} />)}
            </div>
            {rows.length > 0 && (
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-x-6'>
                    {rows.map(book => <BookRow key={book.libid} book={book} />)}
                </div>
            )}
        </div>
    );
};

export const AuthorDetails = ({ className, author }) => (
    <div className={cn('flex flex-col', className)}>
        <div className='flex items-center gap-5 pb-6'>
            <AuthorAvatar
                className='size-24 shrink-0 ring-2 ring-brand/15'
                name={author.name}
            />
            <div className='min-w-0'>
                <Eyebrow className='mb-1'>Autor</Eyebrow>
                <h1 className='font-merriweather font-normal text-[clamp(22px,5vw,36px)] leading-tight text-foreground'>
                    {author.name}
                </h1>
                <p className='text-sm text-muted-foreground font-noto mt-2'>
                    {author.books.length} libros · {author.views} vistas
                </p>
            </div>
        </div>

        <Divider />

        <div className='pt-6'>
            <AuthorBooks books={author.books} />
        </div>
    </div>
);
