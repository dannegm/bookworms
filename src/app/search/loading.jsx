'use server';

import { cn } from '@/helpers/utils';
import Header from '@/components/common/header';
import BooksListLoading from '@/components/common/books-list-loading';

export default async function SearchLoading() {
    return (
        <main className={cn('mx-4 mb-12', 'xl:w-[1000px] xl:mx-auto')}>
            <Header />

            <BooksListLoading className='mt-12' />
        </main>
    );
}
