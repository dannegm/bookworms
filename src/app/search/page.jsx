import { notFound } from 'next/navigation';

import { cn } from '@/helpers/utils';
import Header from '@/components/common/header';
import { search } from '@/services/bookworms';
import BooksList from '@/components/common/books-list';

export default async function SearchPage({ searchParams }) {
    const { query } = await searchParams;
    const { data, error } = await search(query);

    if (error) {
        return notFound();
    }

    return (
        <main className={cn('mx-4 mb-12', 'sm:container sm:mx-auto', 'xl:w-[1000px] xl:mx-auto')}>
            <Header />

            <BooksList className='mt-12' title='Resultados de búsqueda' books={data?.books?.results} />
        </main>
    );
}
