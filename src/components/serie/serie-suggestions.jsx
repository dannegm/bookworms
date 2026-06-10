import { useQuery } from '@tanstack/react-query';

import { getSerie } from '@/services/bookworms';

import { PageInner } from '@/components/layout/primitives';
import { BooksList } from '@/components/book/books-list';
import { BooksListLoading } from '@/components/book/books-list-loading';

export const SerieSuggestions = ({ serieName }) => {
    const { data, isLoading } = useQuery(getSerie(serieName));

    if (isLoading) return (
        <PageInner>
            <BooksListLoading />
        </PageInner>
    );

    return (
        <PageInner className='flex flex-col gap-8'>
            <h2 className='font-bold'>Más libros que podrían interesarte</h2>
            <BooksList books={data?.books} />
        </PageInner>
    );
};
