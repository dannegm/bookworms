import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams, useNavigate } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';

import { getBook } from '@/services/bookworms';

import { Debugger } from '@/components/system/debugger';

import { Layout } from '@/components/layout/layout';
import { PageInner, SearchBoxContainer } from '@/components/layout/primitives';
import { SearchBox } from '@/components/layout/search-box';

import { BookDetails } from '@/components/book/book-details';
import { BookDetailsLoading } from '@/components/book/book-details-loading';
import { SerieSuggestions } from '@/components/serie/serie-suggestions';

export const Book = () => {
    const { libid } = useParams({ strict: false });
    const navigate = useNavigate();

    const { data, isLoading, isError, error } = useQuery(getBook(libid, { retry: 0 }));

    useEffect(() => {
        if (isError) navigate({ to: '/404' });
    }, [isError]);

    if (isLoading) return (
        <Layout>
            <SearchBoxContainer><SearchBox /></SearchBoxContainer>
            <PageInner className='flex flex-col gap-4'>
                <BookDetailsLoading />
            </PageInner>
        </Layout>
    );

    if (!data) return null;

    return (
        <Layout>
            <SearchBoxContainer><SearchBox /></SearchBoxContainer>

            <Helmet>
                <title>{data.title}</title>
            </Helmet>

            <Debugger name='book' data={data} />
            {error && <Debugger name='error' data={error} />}

            <PageInner>
                <BookDetails book={data} />
            </PageInner>

            {data.serie_name && (
                <SerieSuggestions serieName={data.serie_name} currentLibid={data.libid} />
            )}
        </Layout>
    );
};
