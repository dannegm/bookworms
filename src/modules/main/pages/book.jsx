import { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useParams, useNavigate } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';

import { getBook, getSerie } from '@/modules/core/services/bookworms';

import { Debugger } from '@/modules/core/components/debugger';

import { Layout } from '@/modules/main/components/layout';
import { Section } from '@/modules/main/components/section';
import { SearchBox } from '@/modules/main/components/search-box';

import { BookDetails } from '@/modules/main/components/book-details';
import { BooksList } from '@/modules/main/components/books-list';
import { BooksListLoading } from '@/modules/main/components/books-list-loading';
import { BookDetailsLoading } from '@/modules/main/components/book-details-loading';

export const Book = () => {
    const { libid } = useParams({ strict: false });
    const navigate = useNavigate();

    const { data, isLoading, isError, error } = useQuery(getBook(libid, { retry: 0 }));
    const { data: serieData, isLoading: serieLoading } = useQuery({
        ...getSerie(data?.serie_name),
        enabled: !!data?.serie_name,
    });

    useEffect(() => {
        if (isError) navigate({ to: '/404' });
    }, [isError]);

    if (isLoading) return (
        <Layout>
            <SearchBox />
            <Section className='flex flex-col gap-4'>
                <BookDetailsLoading />
            </Section>
        </Layout>
    );

    if (!data) return null;

    return (
        <Layout>
            <SearchBox />

            <Helmet>
                <title>{data.title}</title>
            </Helmet>

            <Debugger name='book' data={data} />
            {error && <Debugger name='error' data={error} />}

            <Section className='flex flex-col gap-4'>
                <BookDetails book={data} />
            </Section>

            {data.serie_name && (
                <Section className='flex flex-col gap-8'>
                    {serieLoading ? (
                        <BooksListLoading />
                    ) : (
                        <>
                            <h2 className='font-bold'>Más libros que podrían interesarte</h2>
                            <BooksList books={serieData?.books} />
                        </>
                    )}
                </Section>
            )}
        </Layout>
    );
};
