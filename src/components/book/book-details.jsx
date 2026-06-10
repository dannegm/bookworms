import { Link } from '@tanstack/react-router';
import { useQueryState, parseAsBoolean } from 'nuqs';
import { trim } from 'lodash';
import { BookOpenText, CalendarDays, Download, Eye, Heart, LibraryBig } from 'lucide-react';

import { cn } from '@/helpers/utils';
import { formatBytes, keyCase } from '@/helpers/strings';
import { useFavorites } from '@/hooks/use-local-list';

import { BookCover } from '@/components/book/book-cover';
import { AuthorPreview } from '@/components/author/author-preview';
import { AuthorChip } from '@/components/author/author-chip';
import { DownloadBook } from '@/components/download/download-book';
import { SendToKindle } from '@/components/download/send-to-kindle';
import { BookViewer } from '@/components/book/book-viewer';
import { TrackClick } from '@/components/system/track-click';
import { Button } from '@/ui/button';
import { Divider } from '@/components/layout/primitives';

const bookSnapshot = book => ({
    libid: book.libid,
    title: book.title,
    authors: book.authors,
    cover_id: book.cover_id,
});

const Stat = ({ icon: Icon, value, label }) => (
    <span className='flex items-center gap-1 text-xs text-muted-foreground font-noto'>
        <Icon className='size-3 shrink-0 text-brand/40' />
        <span className='font-medium text-foreground'>{value}</span>
        {label}
    </span>
);

const Separator = () => <span className='text-border font-noto text-xs'>·</span>;

export const BookDetails = ({ className, book }) => {
    const [viewer, setViewer] = useQueryState('viewer', parseAsBoolean.withDefault(false));
    const [, { toggle: toggleFavorite, has: isFavorite }] = useFavorites();
    const favorited = isFavorite(book.libid);

    return (
        <div className={cn('flex flex-col sm:flex-row gap-8 items-start', className)}>
            {/* Left: cover + actions */}
            <div className='flex flex-col gap-4 items-center sm:items-stretch w-full sm:w-56 shrink-0'>
                <BookCover book={book} width={224} />

                <div className='hidden sm:flex flex-col gap-2'>
                    <DownloadBook className='w-full' book={book} />
                    <SendToKindle className='w-full' book={book} />
                    <TrackClick name='book:read' data={{ book }}>
                        <Button
                            variant='outline'
                            className='w-full font-noto'
                            onClick={() => setViewer(!viewer)}
                        >
                            <BookOpenText />
                            Leer en línea
                        </Button>
                    </TrackClick>
                    <Button
                        variant='outline'
                        className={cn(
                            'w-full font-noto',
                            favorited &&
                                'border-rose-300 text-rose-500 hover:bg-rose-50 hover:text-rose-600 dark:border-rose-700 dark:text-rose-400 dark:hover:bg-rose-950/40',
                        )}
                        onClick={() => toggleFavorite(bookSnapshot(book))}
                    >
                        <Heart className={cn(favorited && 'fill-current')} />
                        {favorited ? 'En favoritos' : 'Añadir a favoritos'}
                    </Button>
                    {book.size && (
                        <p className='text-center text-[11px] text-muted-foreground font-noto mt-0.5'>
                            Tamaño:{' '}
                            <span className='text-foreground font-medium'>
                                {formatBytes(book.size)}
                            </span>
                        </p>
                    )}
                </div>
            </div>

            {viewer && <BookViewer size='lg' className='w-full sm:w-56' book={book} />}

            {/* Right: content */}
            <div className='flex flex-col gap-4 flex-1 min-w-0'>
                {/* Serie pill */}
                {book.serie_name && (
                    <Link
                        to={`/serie/${keyCase(book.serie_name)}`}
                        className='inline-flex items-center gap-1.5 w-fit text-xs font-noto text-brand bg-brand/10 hover:bg-brand/15 px-3 py-1.5 rounded-full transition-colors'
                    >
                        <LibraryBig className='size-3.5' />
                        {book.serie_name}
                        <span className='text-brand/50'>·</span>#{book.serie_sequence}
                    </Link>
                )}

                {/* Title */}
                <h1 className='font-merriweather font-normal text-[clamp(20px,5vw,32px)] leading-[1.15] text-foreground text-pretty'>
                    {book.title}
                </h1>

                {/* Authors */}
                {book.authors.length > 1 ? (
                    <div className='flex flex-wrap gap-1.5'>
                        {book.authors.map(author => (
                            <AuthorChip key={author.name} author={author} />
                        ))}
                    </div>
                ) : (
                    <AuthorPreview className='self-start' author={book.authors[0]} />
                )}

                {/* Stats */}
                <div className='flex items-center gap-2 flex-wrap'>
                    {book.pagecount && (
                        <>
                            <Stat icon={BookOpenText} value={book.pagecount} label='páginas' />
                            <Separator />
                        </>
                    )}
                    {book.published && (
                        <>
                            <Stat icon={CalendarDays} value={book.published} />
                            <Separator />
                        </>
                    )}
                    <Stat icon={Download} value={book.downloads} label='descargas' />
                    <Separator />
                    <Stat icon={Eye} value={book.views} label='vistas' />
                </div>

                <Divider />

                {/* Description */}
                {book.description && (
                    <div className='text-[15px] text-foreground/75 leading-[1.4] text-pretty font-noto'>
                        {book.description.split('. ').map((sentence, i) => (
                            <p key={i} className='mb-3 last:mb-0'>
                                {trim(sentence.trim(), '.')}.
                            </p>
                        ))}
                    </div>
                )}

                {/* Categories */}
                {book.labels?.length > 0 && (
                    <div className='flex flex-wrap gap-1.5'>
                        {book.labels.map(category => (
                            <span
                                key={category}
                                className='text-[11px] font-noto px-2.5 py-1 rounded-full bg-muted text-muted-foreground hover:bg-muted/70 hover:text-foreground transition-colors cursor-default'
                            >
                                {category}
                            </span>
                        ))}
                    </div>
                )}

                {/* Mobile actions */}
                <div className='flex flex-col gap-2 mt-2 pt-4 border-t border-border sm:hidden'>
                    <DownloadBook className='w-full' book={book} />
                    <SendToKindle className='w-full' book={book} />
                    <Button
                        variant='outline'
                        className='w-full font-noto'
                        onClick={() => setViewer(!viewer)}
                    >
                        <BookOpenText />
                        Leer en línea
                    </Button>
                    <Button
                        variant='outline'
                        className={cn(
                            'w-full font-noto',
                            favorited &&
                                'border-rose-300 text-rose-500 hover:bg-rose-50 hover:text-rose-600 dark:border-rose-700 dark:text-rose-400 dark:hover:bg-rose-950/40',
                        )}
                        onClick={() => toggleFavorite(bookSnapshot(book))}
                    >
                        <Heart className={cn(favorited && 'fill-current')} />
                        {favorited ? 'En favoritos' : 'Añadir a favoritos'}
                    </Button>
                </div>
            </div>
        </div>
    );
};
