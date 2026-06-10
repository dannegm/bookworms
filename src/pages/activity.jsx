import { Helmet } from 'react-helmet-async';
import { Clock, Download, Heart } from 'lucide-react';
import { Link } from '@tanstack/react-router';

import { keyCase } from '@/helpers/strings';
import { useFavorites, useDownloads, useReadingHistory } from '@/hooks/use-local-list';

import { Layout } from '@/components/layout/layout';
import { SearchBox } from '@/components/layout/search-box';
import { Eyebrow, PageInner, SearchBoxContainer, Divider } from '@/components/layout/primitives';
import { BookCard } from '@/components/book/book-card';
import { BookCover } from '@/components/book/book-cover';

const EmptySection = ({ message }) => (
    <div className='flex items-center gap-3 px-4 py-4 rounded-xl border border-dashed border-border'>
        <p className='text-sm text-muted-foreground font-noto'>{message}</p>
    </div>
);

const BookRow = ({ book }) => {
    const params = { libid: String(book.libid), title: keyCase(book.title) };
    return (
        <Link
            to='/book/$libid/$title'
            params={params}
            className='flex items-center gap-3 py-2.5 border-b border-border/50 last:border-b-0 hover:bg-muted/40 -mx-2 px-2 rounded-lg transition-colors group'
        >
            <BookCover book={book} width={36} className='shrink-0 rounded' />
            <div className='flex-1 min-w-0'>
                <p className='text-sm font-medium text-foreground truncate font-noto group-hover:text-brand transition-colors'>
                    {book.title}
                </p>
                <p className='text-[11px] text-muted-foreground truncate font-noto'>
                    {book.authors?.map(a => a?.name ?? a).join(', ')}
                </p>
            </div>
        </Link>
    );
};

const SectionHeader = ({ icon: Icon, label, count }) => (
    <div className='flex items-center gap-2.5 mb-5'>
        <div className='size-7 rounded-lg bg-brand/10 flex items-center justify-center text-brand shrink-0'>
            <Icon className='size-3.5 stroke-[1.5]' />
        </div>
        <div className='flex items-baseline gap-2'>
            <Eyebrow>{label}</Eyebrow>
            {count > 0 && (
                <span className='text-[11px] text-muted-foreground font-noto'>{count}</span>
            )}
        </div>
    </div>
);

const GridSection = ({ icon, label, books, emptyMessage }) => (
    <PageInner className='py-6'>
        <SectionHeader icon={icon} label={label} count={books.length} />
        {books.length === 0 ? (
            <EmptySection message={emptyMessage} />
        ) : (
            <div className='grid grid-cols-3 sm:grid-cols-5 md:grid-cols-6 gap-2.5'>
                {books.map(book => (
                    <BookCard key={book.libid} book={book} />
                ))}
            </div>
        )}
    </PageInner>
);

const RowSection = ({ icon, label, books, emptyMessage }) => (
    <PageInner className='py-6'>
        <SectionHeader icon={icon} label={label} count={books.length} />
        {books.length === 0 ? (
            <EmptySection message={emptyMessage} />
        ) : (
            <div>
                {books.map(book => (
                    <BookRow key={book.libid} book={book} />
                ))}
            </div>
        )}
    </PageInner>
);

export const Activity = () => {
    const [favorites] = useFavorites();
    const [downloads] = useDownloads();
    const [reading] = useReadingHistory();

    return (
        <Layout>
            <Helmet>
                <title>Mi actividad — Bookworms</title>
            </Helmet>

            <SearchBoxContainer>
                <SearchBox />
            </SearchBoxContainer>

            <PageInner className='pb-2'>
                <div className='w-9 h-0.75 bg-brand rounded-full mb-4.5' />
                <h1 className='font-merriweather font-normal text-[clamp(24px,6vw,36px)] leading-tight text-foreground'>
                    Mi actividad
                </h1>
                <p className='text-sm text-foreground/60 font-noto mt-2'>
                    Guardado localmente en este dispositivo.
                </p>
            </PageInner>

            <Divider />

            <GridSection
                icon={Heart}
                label='Favoritos'
                books={favorites}
                emptyMessage='Aún no tienes favoritos. Añade libros desde su página de detalle.'
            />

            <Divider />

            <RowSection
                icon={Clock}
                label='Historial de lectura'
                books={reading}
                emptyMessage='Aún no has abierto ningún libro en el lector.'
            />

            <Divider />

            <RowSection
                icon={Download}
                label='Descargas'
                books={downloads}
                emptyMessage='Aún no has descargado ningún libro.'
            />
        </Layout>
    );
};
