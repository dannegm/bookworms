'use server';
import { redirect, RedirectType } from 'next/navigation';

import { cn } from '@/helpers/utils';
import { retry } from '@/helpers/handlers';
import { search } from '@/services/bookworms';

import Header from '@/components/common/header';
import BooksList from '@/components/common/books-list';
import AuthorsList from '@/components/common/authors-list';
import SeriesLists from '@/components/common/series-lists';
import Pagination from '@/components/common/pagination';

const BOOKS_PER_PAGE = 12;

const redundantSearch = async ({ query, page = 1, limit = 20 }) => {
    const [result, error] = await retry(() => search({ query, page, limit }), { delay: 1000 });
    return [result, error];
};

export default async function SearchPage({ searchParams }) {
    const { query, page } = await searchParams;
    const [data, error] = await redundantSearch({ query, page, limit: BOOKS_PER_PAGE });

    if (error) {
        return redirect('/404', RedirectType.replace);
    }

    return (
        <main className={cn('mx-4 mb-12', 'xl:w-[1000px] xl:mx-auto')}>
            <Header />

            <AuthorsList
                className='mt-12'
                title='Autores encontrados'
                authors={data?.authors?.results}
                limit={8}
            />

            <SeriesLists
                className='mt-12'
                title='Series encontrados'
                series={data?.series?.results}
                limit={8}
            />

            <BooksList className='mt-12' title='Libros encontrados' books={data?.books?.results} />

            <Pagination className='mt-12' total={Math.ceil(data?.books?.total / BOOKS_PER_PAGE)} />
        </main>
    );
}
