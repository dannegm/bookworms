import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams, useNavigate } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';

import { getAuthor } from '@/services/bookworms';

import { Debugger } from '@/components/system/debugger';

import { Layout } from '@/components/layout/layout';
import { PageInner, SearchBoxContainer } from '@/components/layout/primitives';
import { SearchBox } from '@/components/layout/search-box';

import { AuthorDetails } from '@/components/author/author-details';
import { AuthorDetailsLoading } from '@/components/author/author-details-loading';

export const Author = () => {
    const { key } = useParams({ strict: false });
    const navigate = useNavigate();

    const { data, isLoading, isError, error } = useQuery(getAuthor(key, { retry: 0 }));

    useEffect(() => {
        if (isError) navigate({ to: '/404' });
    }, [isError]);

    if (isLoading) return (
        <Layout>
            <SearchBoxContainer><SearchBox /></SearchBoxContainer>
            <PageInner>
                <AuthorDetailsLoading />
            </PageInner>
        </Layout>
    );

    if (!data) return null;

    return (
        <Layout>
            <SearchBoxContainer><SearchBox /></SearchBoxContainer>

            <Helmet>
                <title>{data.name}</title>
            </Helmet>

            <Debugger name='author' data={data} />
            {error && <Debugger name='error' data={error} />}

            <PageInner>
                <AuthorDetails author={data} />
            </PageInner>
        </Layout>
    );
};
