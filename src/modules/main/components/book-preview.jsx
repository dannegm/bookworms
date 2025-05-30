import { cn } from '@/modules/core/helpers/utils';
import { BookCover } from './book-cover';
import { Tooltip } from '@/modules/shadcn/ui/tooltip-simple';
import { DownloadBook } from './download-book';
import { Download, Eye } from 'lucide-react';
import { keyCase } from '@/modules/core/helpers/strings';

export const BookPreview = ({ className, book }) => {
    return (
        <a
            className={cn('flex flex-col items-center cursor-pointer', className)}
            href={`/book/${book.libid}/${keyCase(book.title)}`}
        >
            <div className='relative mx-auto'>
                <BookCover key={book.libid} book={book} width={140} />
            </div>

            <Tooltip content={book.title}>
                <h3 className='mt-4 text-center text-sm font-bold line-clamp-1'>{book.title}</h3>
            </Tooltip>

            {book?.authors && (
                <p className='text-center text-sm line-clamp-1'>{book.authors[0].name}</p>
            )}

            <div className='flex h-5 items-center gap-2 text-xs sm:text-sm text-slate-500 dark:text-slate-300'>
                <div className='flex flex-row gap-1 items-center'>
                    <Download className='size-4' />
                    <b>{book.downloads}</b> descargas
                </div>

                <div className='flex flex-row gap-1 items-center'>
                    <Eye className='size-4' />
                    <b>{book.views}</b> vistas
                </div>
            </div>

            <div className='mt-4 w-full'>
                <DownloadBook className='w-full' book={book} />
            </div>
        </a>
    );
};
