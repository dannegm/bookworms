import { BookOpenText, CalendarDays, Download, Eye, LibraryBig, Tag } from 'lucide-react';
import { cn } from '@/modules/core/helpers/utils';
import { formatBytes, keyCase } from '@/modules/core/helpers/strings';

import { Badge } from '@/modules/shadcn/ui/badge';
import { BookCover } from '@/modules/main/components/book-cover';
import { AuthorPreview } from '@/modules/main/components/author-preview';
import { AuthorChip } from '@/modules/main/components/author-chip';
import { DownloadBook } from '@/modules/main/components/download-book';

export const BookDetails = ({ className, book }) => {
    return (
        <div className={cn(className)}>
            <div className='flex flex-col sm:flex-row items-start gap-8'>
                <figure className='flex w-full justify-center sm:justify-start'>
                    <BookCover book={book} width={200} />
                </figure>

                <article className='flex flex-col gap-4'>
                    <header className='flex flex-col gap-4 items-start'>
                        <h1 className='text-2xl font-bold font-merriweather'>{book.title}</h1>

                        {book.authors.length > 1 ? (
                            <div className='flex flex-row flex-wrap gap-2'>
                                {book.authors.map(author => (
                                    <AuthorChip key={`author-${author.name}`} author={author} />
                                ))}
                            </div>
                        ) : (
                            <AuthorPreview className='-ml-1' author={book.authors[0]} />
                        )}

                        <div
                            className={cn(
                                'grid grid-cols-2 gap-2 text-sm [&_svg]:size-4 bg-neutral-100 dark:bg-neutral-800 px-6 py-4 rounded-md',
                            )}
                        >
                            <span className='flex flex-row gap-2 items-center'>
                                <BookOpenText />
                                <b>{book.pagecount}</b> páginas
                            </span>

                            <span className='flex flex-row gap-2 items-center'>
                                <CalendarDays />
                                Publicación <b>{book.published}</b>
                            </span>

                            <span className='flex flex-row gap-2 items-center'>
                                <Download />
                                <b>{book.downloads}</b> descargas
                            </span>

                            <span className='flex flex-row gap-2 items-center'>
                                <Eye />
                                <b>{book.views}</b> vistas
                            </span>
                        </div>
                    </header>

                    <section className='mt-4'>
                        <p className='text-sm text-pretty'>{book.description}</p>
                    </section>

                    <footer className='flex flex-col items-start gap-4 mt-8'>
                        {book.serie_name && (
                            <a
                                className={cn(
                                    'flex flex-row gap-2 items-center px-4 py-2 pr-6 bg-gray-200 hover:bg-gray-300 rounded-full [&_svg]:size-4',
                                    'bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600',
                                )}
                                href={`/serie/${keyCase(book.serie_name)}`}
                            >
                                <LibraryBig />
                                <span>
                                    {book.serie_name} <b>#{book.serie_sequence}</b>
                                </span>
                            </a>
                        )}

                        <div className='flex flex-row gap-1'>
                            {book.labels.map(category => (
                                <Badge
                                    key={`category-${category}`}
                                    variant='outline'
                                    className='bg-cyan-300 dark:bg-cyan-800 text-cyan-900 dark:text-cyan-100'
                                >
                                    <Tag /> {category}
                                </Badge>
                            ))}
                        </div>

                        <div className='flex flex-col sm:flex-row gap-4 items-start sm:items-center w-full mt-8'>
                            <DownloadBook size='lg' className='w-full sm:w-56' book={book} />
                            <span className='text-sm text-slate-600 dark:text-slate-400'>
                                <b>{`${formatBytes(book.size)}`}</b> Tamaño del archivo
                            </span>
                        </div>
                    </footer>
                </article>
            </div>
        </div>
    );
};
