import { Helmet } from 'react-helmet-async';
import { Check, Clock, Download, Heart, X } from 'lucide-react';
import { Link } from '@tanstack/react-router';

import { keyCase } from '@/helpers/strings';
import { useFavorites, useDownloads, useReadingHistory } from '@/hooks/use-local-list';
import { useLocalStorage } from '@/hooks/use-local-storage';

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

const CircleProgress = ({ value }) => {
    const r = 10;
    const circumference = 2 * Math.PI * r;
    const offset = circumference - (value / 100) * circumference;

    return (
        <svg width='28' height='28' viewBox='0 0 28 28' className='-rotate-90'>
            <circle cx='14' cy='14' r={r} fill='none' strokeWidth='2.5' className='stroke-muted' />
            <circle
                cx='14' cy='14' r={r} fill='none' strokeWidth='2.5'
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                strokeLinecap='round'
                className='stroke-brand transition-all duration-300'
            />
        </svg>
    );
};

const BookRow = ({ book, onRemove }) => {
    const params = { libid: String(book.libid), title: keyCase(book.title) };
    const [progress] = useLocalStorage(`book:viewer:${book.libid}:progress`, 0);

    return (
        <div className='flex items-center gap-2 border-b border-border/50 last:border-b-0 group'>
            <Link
                to='/book/$libid/$title'
                params={params}
                className='flex items-center gap-3 py-2.5 flex-1 min-w-0 hover:bg-muted/40 -mx-2 px-2 rounded-lg transition-colors group/link'
            >
                <BookCover book={book} width={36} className='shrink-0 rounded' />
                <div className='flex-1 min-w-0'>
                    <p className='text-sm font-medium text-foreground truncate font-noto group-hover/link:text-brand transition-colors'>
                        {book.title}
                    </p>
                    <p className='text-[11px] text-muted-foreground truncate font-noto'>
                        {book.authors?.map(a => a?.name ?? a).join(', ')}
                    </p>
                </div>
                {progress > 0 && (
                    progress >= 100 ? (
                        <span className='shrink-0 inline-flex items-center gap-1 text-[10px] font-noto font-medium sm:px-2 sm:py-0.5 size-6 sm:size-auto rounded-full bg-emerald-600 text-white dark:bg-emerald-700 dark:text-white justify-center'>
                            <Check className='size-3 shrink-0' />
                            <span className='hidden sm:inline'>Completado</span>
                        </span>
                    ) : (
                        <div className='shrink-0 flex items-center gap-1.5'>
                            <span className='hidden sm:block text-[11px] text-muted-foreground font-noto'>{progress}% completado</span>
                            <CircleProgress value={progress} />
                        </div>
                    )
                )}
            </Link>
            <button
                onClick={() => onRemove(book.libid)}
                className='shrink-0 size-6 flex items-center justify-center rounded-md text-muted-foreground hover:text-foreground hover:bg-muted sm:opacity-0 sm:group-hover:opacity-100 transition-all'
            >
                <X className='size-3.5' />
            </button>
        </div>
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
                <span className='text-[11px] uppercase tracking-widest text-muted-foreground font-noto'>— {count} {count === 1 ? 'libro' : 'libros'}</span>
            )}
        </div>
    </div>
);

const GridSection = ({ icon, label, books, emptyMessage, onRemove }) => (
    <PageInner className='py-6'>
        <SectionHeader icon={icon} label={label} count={books.length} />
        {books.length === 0 ? (
            <EmptySection message={emptyMessage} />
        ) : (
            <div className='grid grid-cols-3 sm:grid-cols-5 md:grid-cols-6 gap-2.5'>
                {books.map(book => (
                    <div key={book.libid} className='relative group/card'>
                        <BookCard book={book} />
                        <button
                            onClick={() => onRemove(book.libid)}
                            className='absolute top-1.5 right-1.5 z-20 size-5 flex items-center justify-center rounded-full bg-black/50 text-white sm:opacity-0 sm:group-hover/card:opacity-100 transition-opacity'
                        >
                            <X className='size-3' />
                        </button>
                    </div>
                ))}
            </div>
        )}
    </PageInner>
);

const RowSection = ({ icon, label, books, emptyMessage, onRemove }) => (
    <PageInner className='py-6'>
        <SectionHeader icon={icon} label={label} count={books.length} />
        {books.length === 0 ? (
            <EmptySection message={emptyMessage} />
        ) : (
            <div>
                {books.map(book => (
                    <BookRow key={book.libid} book={book} onRemove={onRemove} />
                ))}
            </div>
        )}
    </PageInner>
);

export const Activity = () => {
    const [favorites, { remove: removeFavorite }] = useFavorites();
    const [downloads, { remove: removeDownload }] = useDownloads();
    const [reading, { remove: removeReading }] = useReadingHistory();

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
                onRemove={removeFavorite}
            />

            <Divider />

            <RowSection
                icon={Clock}
                label='Historial de lectura'
                books={reading}
                emptyMessage='Aún no has abierto ningún libro en el lector.'
                onRemove={removeReading}
            />

            <Divider />

            <RowSection
                icon={Download}
                label='Descargas'
                books={downloads}
                emptyMessage='Aún no has descargado ningún libro.'
                onRemove={removeDownload}
            />
        </Layout>
    );
};
