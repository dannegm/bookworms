import Link from 'next/link';
import { Divider } from '@nextui-org/divider';

import { cn } from '@/helpers/utils';
import { formatBytes, keyCase } from '@/helpers/strings';

import BookOpenTextRegular from '@/components/icons/book-open-text-regular';
import CalendarDotsRegular from '@/components/icons/calendar-dots-regular';
import DownloadSimpleRegular from '@/components/icons/download-simple-regular';
import EyeRegular from '@/components/icons/eye-regular';
import BooksRegular from '@/components/icons/books-regular';

import BookCover from './book-cover';
import DownloadBook from './download-book';
import AuthorChip from './author-chip';
import AuthorPreview from './author-preview';
import CategoryChip from './category-chip';
import BookSerie from './book-serie';

export default function BookDetails({ className, book }) {
    return (
        <div className={cn(className)}>
            <div
                className={cn(
                    'flex flex-col gap-8 items-center',
                    'sm:flex-row sm:items-start',
                    'xl:gap-16',
                )}
            >
                <div
                    className={cn(
                        'relative',
                        'w-[250px] h-[375px] sm:w-[280px] sm:h-[420px] md:w-[340px] md:h-[510px]',
                    )}
                >
                    <BookCover
                        className={cn(
                            '$main absolute z-20 rounded-xl shadow-2xl',
                            'w-[250px] h-[375px] sm:w-[280px] sm:h-[420px] md:w-[340px] md:h-[510px]',
                        )}
                        book={book}
                    />
                    <BookCover
                        className={cn(
                            '$blur rounded-xl blur-3xl opacity-50',
                            'w-[250px] h-[375px] sm:w-[280px] sm:h-[420px] md:w-[340px] md:h-[510px]',
                        )}
                        book={book}
                    />
                </div>

                <div
                    className={cn(
                        'relative z-20 flex flex-col gap-4 items-center w-full px-4',
                        'sm:items-start',
                    )}
                >
                    <h3
                        className={cn(
                            'text-slate-900 text-2xl font-bold text-center text-balance',
                            'sm:text-left',
                        )}
                    >
                        {book.title}
                    </h3>

                    {book.authors.length > 1 ? (
                        <div className='flex flex-row flex-wrap gap-2'>
                            {book.authors.map(author => (
                                <AuthorChip key={`author-${author.name}`} author={author} />
                            ))}
                        </div>
                    ) : (
                        <div className='flex flex-row flex-wrap gap-2'>
                            <AuthorPreview author={book.authors[0]} />
                        </div>
                    )}

                    <div
                        className={cn(
                            'flex flex-wrap w-[320px] justify-center items-center gap-4 text-small',
                            'sm:justify-start sm:w-auto',
                            'lg:h-5',
                        )}
                    >
                        <div className='flex flex-row gap-2 items-center'>
                            <BookOpenTextRegular />
                            <b>{book.pagecount}</b> páginas
                        </div>
                        <Divider orientation='vertical' />
                        <div className='flex flex-row gap-2 items-center'>
                            <CalendarDotsRegular />
                            Publicación <b>{book.published}</b>
                        </div>
                        <Divider orientation='vertical' />
                        <div className='flex flex-row gap-2 items-center'>
                            <DownloadSimpleRegular />
                            <b>{book.downloads}</b> descargas
                        </div>
                        <Divider orientation='vertical' />
                        <div className='flex flex-row gap-2 items-center'>
                            <EyeRegular />
                            <b>{book.views}</b> vistas
                        </div>
                    </div>

                    <p className='text-slate-700 text-balance w-full sm:max-w-[600px]'>
                        {book.description}
                    </p>

                    {book.serie_name && (
                        <div className='flex flex-row gap-1'>
                            <Link
                                className='flex flex-row gap-2 items-center bg-orange-500 text-white px-4 py-2 rounded-lg'
                                href={`/serie/${keyCase(book.serie_name)}`}
                            >
                                <BooksRegular />
                                <span>
                                    {book.serie_name} <b>#{book.serie_sequence}</b>
                                </span>
                            </Link>
                        </div>
                    )}

                    <div className='flex flex-row gap-1'>
                        {book.labels.map(category => (
                            <CategoryChip key={`category-${category}`} category={category} />
                        ))}
                    </div>

                    <div className='flex flex-col lg:flex-row gap-4 items-center mt-8'>
                        <DownloadBook className='w-56' book={book} />
                        <span className='text-medium text-slate-600'>
                            <b>{`${formatBytes(book.size)}`}</b> Tamaño del archivo
                        </span>
                    </div>
                </div>
            </div>

            {book.serie_name && (
                <div className=''>
                    <BookSerie
                        title='Más libros que podrían interesarte'
                        serieKey={keyCase(book.serie_name)}
                        limit={6}
                    />
                </div>
            )}
        </div>
    );
}
