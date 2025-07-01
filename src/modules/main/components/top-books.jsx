import { DataLoader } from '@/modules/core/components/data-loader';

import { getTop } from '@/modules/core/services/bookworms';

import { Debugger } from '@/modules/core/components/debugger';
import { BooksListLoading } from '@/modules/main/components/books-list-loading';
import { BooksList } from '@/modules/main/components/books-list';

export const TopBooks = ({ title = 'Top Books', category = 'views', limit = 6 }) => {
    return (
        <div className='flex flex-col gap-8'>
            <h2 className='font-bold'>{title}</h2>
            <DataLoader
                query={getTop('books', category, limit)}
                tags={[`top:books:${category}`]}
                loader={<BooksListLoading />}
            >
                {({ data, error }) => (
                    <>
                        {error && <Debugger name='error' data={error} simple />}
                        <Debugger name='books' data={data} simple />
                        <BooksList books={data} />
                    </>
                )}
            </DataLoader>
        </div>
    );
};
