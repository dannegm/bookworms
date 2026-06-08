import { useQuery } from '@tanstack/react-query';

import { getTop } from '@/modules/core/services/bookworms';

import { Debugger } from '@/modules/core/components/debugger';
import { BooksListLoading } from '@/modules/main/components/books-list-loading';
import { BooksList } from '@/modules/main/components/books-list';

export const TopBooks = ({ title = 'Top Books', category = 'views', limit = 6 }) => {
    const { data, isLoading, error } = useQuery(getTop('books', category, limit));

    if (isLoading) return (
        <div className='flex flex-col gap-8'>
            <h2 className='font-bold'>{title}</h2>
            <BooksListLoading />
        </div>
    );

    return (
        <div className='flex flex-col gap-8'>
            <h2 className='font-bold'>{title}</h2>
            {error && <Debugger name='error' data={error} simple />}
            <Debugger name='books' data={data} simple />
            <BooksList books={data} />
        </div>
    );
};
