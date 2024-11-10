import { cn } from '@/helpers/utils';

import { retry } from '@/helpers/handlers';
import { thousands } from '@/helpers/strings';
import { getSummaries } from '@/services/bookworms';

import BookOpenRegular from '@/components/icons/book-open-regular';
import UserRegular from '@/components/icons/user-regular';
import BooksRegular from '@/components/icons/books-regular';

const redundantGetSummaries = async () => {
    const [result, error] = await retry(() => getSummaries(), { delay: 1000 });
    return [result, error];
};

export default async function Summaries({ className }) {
    const [data, error] = await redundantGetSummaries();

    if (error) {
        return <></>;
    }

    return (
        <div className={cn('flex flex-row gap-2 items-center text-sm text-gray-600', className)}>
            <div className='flex flex-row gap-1 items-center'>
                <BookOpenRegular />
                <span className=''>{thousands(data.books)}</span>
                <span className='hidden sm:block'>Libros</span>
            </div>
            <div className='flex flex-row gap-1 items-center'>
                <BooksRegular />
                <span className=''>{thousands(data.series)}</span>
                <span className='hidden sm:block'>Series</span>
            </div>
            <div className='flex flex-row gap-1 items-center'>
                <UserRegular />
                <span className=''>{thousands(data.authors)}</span>
                <span className='hidden sm:block'>Autores</span>
            </div>
        </div>
    );
}
