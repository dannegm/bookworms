import { Divider } from '@nextui-org/divider';

import { cn } from '@/helpers/utils';
import { formatBytes, keyCase } from '@/helpers/strings';
import { getBook } from '@/services/bookworms';

import BookOpenTextRegular from '@/components/icons/book-open-text-regular';
import CalendarDotsRegular from '@/components/icons/calendar-dots-regular';
import DownloadSimpleRegular from '@/components/icons/download-simple-regular';
import EyeRegular from '@/components/icons/eye-regular';

import BookCover from './book-cover';
import DownloadBook from './download-book';
import AuthorChip from './author-chip';
import AuthorPreview from './author-preview';
import CategoryChip from './category-chip';

export default async function BookDetails({ className, libid }) {
    const book = await getBook(libid);

    return (
        <div
            className={cn(
                'flex flex-col gap-16 items-center',
                'sm:flex-row sm:items-start',
                className,
            )}
        >
            <div className={cn('relative w-[240px]', 'md:w-[340px]')}>
                <BookCover
                    className={cn(
                        '$main absolute z-20 rounded-xl shadow-2xl w-[250px] h-[375px]',
                        'md:w-[340px] md:h-[510px]',
                    )}
                    book={book}
                />
                <BookCover
                    className={cn(
                        '$blur rounded-xl blur-3xl opacity-50 w-[250px] h-[375px]',
                        'md:w-[340px] md:h-[510px]',
                    )}
                    book={book}
                />
            </div>

            <div className={cn('flex flex-col gap-4 items-center w-full px-4', 'sm:items-start')}>
                <h3 className='text-slate-900 text-2xl font-bold text-center text-balance'>
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
                        <AuthorPreview authorKey={keyCase(book.authors[0].name)} />
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

                <div className='flex flex-row gap-1'>
                    {book.labels.map(category => (
                        <CategoryChip key={`category-${category}`} category={category} />
                    ))}
                </div>

                <div className='flex flex-row gap-4 items-center mt-8'>
                    <DownloadBook className='w-56' book={book} />
                    <span className='text-medium text-slate-600'>
                        <b>{`${formatBytes(book.size)}`}</b> Tamaño del archivo
                    </span>
                </div>
            </div>
        </div>
    );
}
