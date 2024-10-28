'use server';
import { notFound } from 'next/navigation';

import { cn } from '@/helpers/utils';
import Header from '@/components/common/header';
import { search } from '@/services/bookworms';
import BooksList from '@/components/common/books-list';
import AuthorsList from '@/components/common/authors-list';
import SeriesLists from '@/components/common/series-lists';

export default async function SearchPage({ searchParams }) {
    const { query, showRest } = await searchParams;
    const { data, error } = await search(query);

    if (error) {
        return notFound();
    }

    return (
        <main className={cn('mx-4 mb-12', 'sm:container sm:mx-auto', 'xl:w-[1000px] xl:mx-auto')}>
            <Header />

            <AuthorsList
                className='mt-12'
                title='Autores encontrados'
                authors={data?.authors?.results}
                showRest={showRest}
                limit={8}
            />

            <SeriesLists
                className='mt-12'
                title='Series encontrados'
                series={data?.series?.results}
                showRest={showRest}
                limit={8}
            />

            <BooksList className='mt-12' title='Libros encontrados' books={data?.books?.results} />
        </main>
    );
}
