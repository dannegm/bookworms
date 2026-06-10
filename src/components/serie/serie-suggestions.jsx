import { useQuery } from '@tanstack/react-query';

import { getSerie } from '@/services/bookworms';

import { PageInner, Divider, Eyebrow, SectionTitle } from '@/components/layout/primitives';
import { BookRow } from '@/components/book/book-row';
import { BooksListLoading } from '@/components/book/books-list-loading';

export const SerieSuggestions = ({ serieName, currentLibid }) => {
    const { data, isLoading } = useQuery(getSerie(serieName));

    if (isLoading) return (
        <>
            <Divider />
            <PageInner>
                <BooksListLoading items={4} />
            </PageInner>
        </>
    );

    const suggestions = (data?.books ?? [])
        .filter(book => book.libid !== currentLibid)
        .sort((a, b) => (a.serie_sequence ?? Infinity) - (b.serie_sequence ?? Infinity));

    if (!suggestions.length) return null;

    return (
        <>
            <Divider />
            <PageInner className='flex flex-col gap-4'>
                <div>
                    <Eyebrow className='mb-1'>Más de esta serie</Eyebrow>
                    <SectionTitle>{serieName}</SectionTitle>
                </div>
                <div className='flex flex-col'>
                    {suggestions.map(book => (
                        <BookRow key={book.libid} book={book} />
                    ))}
                </div>
            </PageInner>
        </>
    );
};
