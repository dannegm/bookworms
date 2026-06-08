import { useQuery } from '@tanstack/react-query';

import { getSerie } from '@/modules/core/services/bookworms';

import { Section } from '@/modules/main/components/section';
import { BooksList } from '@/modules/main/components/books-list';
import { BooksListLoading } from '@/modules/main/components/books-list-loading';

export const SerieSuggestions = ({ serieName }) => {
    const { data, isLoading } = useQuery(getSerie(serieName));

    if (isLoading) return (
        <Section>
            <BooksListLoading />
        </Section>
    );

    return (
        <Section className='flex flex-col gap-8'>
            <h2 className='font-bold'>Más libros que podrían interesarte</h2>
            <BooksList books={data?.books} />
        </Section>
    );
};
