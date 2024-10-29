import { Card, CardBody, CardFooter } from '@nextui-org/card';
import { Divider } from '@nextui-org/divider';
import { Tooltip } from '@nextui-org/tooltip';

import { cn } from '@/helpers/utils';

import DownloadSimpleRegular from '@/components/icons/download-simple-regular';
import EyeRegular from '@/components/icons/eye-regular';

import BookCover from './book-cover';
import DownloadBook from './download-book';

export default function BookPreview({ className, book }) {
    return (
        <Card
            className={cn(
                'flex flex-col gap-0 px-1 py-2 bg-white overflow-hidden',
                'sm:py-4',
                'md:gap-2 md:py-8',
                className,
            )}
            as='a'
            href={`/book/${book.libid}`}
            isPressable
        >
            <CardBody className='overflow-visible'>
                <div className='relative mx-auto'>
                    <BookCover
                        className={cn(
                            '$main absolute z-20 rounded-xl shadow-xl',
                            'w-[120px] h-[180px] sm:w-[180px] sm:h-[270px] md:w-[200px] md:h-[300px]',
                        )}
                        book={book}
                    />
                    <BookCover
                        className={cn(
                            '$blur rounded-xl blur-3xl opacity-35',
                            'w-[120px] h-[180px] sm:w-[180px] sm:h-[270px] md:w-[200px] md:h-[300px]',
                        )}
                        book={book}
                    />
                </div>

                <Tooltip className='bg-black text-white rounded-md' content={book.title} delay={1000}>
                    <h3 className='mt-4 px-4 text-center text-slate-900 text-medium font-bold truncate'>
                        {book.title}
                    </h3>
                </Tooltip>

                {book?.authors && (
                    <p className='px-4 text-center text-slate-700 text-small '>
                        {book.authors[0].name}
                    </p>
                )}

                <div className='flex w-auto mx-auto h-5 items-center gap-2 text-sm text-slate-500'>
                    <div className='flex flex-row gap-2 items-center'>
                        <DownloadSimpleRegular />
                        <b>{book.downloads}</b> descargas
                    </div>
                    <Divider className='hidden lg:block' orientation='vertical' />
                    <div className='hidden lg:flex flex-row gap-2 items-center'>
                        <EyeRegular />
                        <b>{book.views}</b> vistas
                    </div>
                </div>
            </CardBody>

            <CardFooter className='flex flex-col gap-2'>
                <DownloadBook className='w-full' book={book} />
            </CardFooter>
        </Card>
    );
}
