import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams, useNavigate } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';

import { getAuthor } from '@/modules/core/services/bookworms';

import { Debugger } from '@/modules/core/components/debugger';

import { Layout } from '@/modules/main/components/layout';
import { Section } from '@/modules/main/components/section';
import { SearchBox } from '@/modules/main/components/search-box';

import { AuthorDetails } from '@/modules/main/components/author-details';
import { AuthorDetailsLoading } from '@/modules/main/components/author-details-loading';

export const Author = () => {
    const { key } = useParams({ strict: false });
    const navigate = useNavigate();

    const { data, isLoading, isError, error } = useQuery(getAuthor(key, { retry: 0 }));

    useEffect(() => {
        if (isError) navigate({ to: '/404' });
    }, [isError]);

    if (isLoading) return (
        <Layout>
            <SearchBox />
            <Section className='flex flex-col gap-4'>
                <AuthorDetailsLoading />
            </Section>
        </Layout>
    );

    if (!data) return null;

    return (
        <Layout>
            <SearchBox />

            <Helmet>
                <title>{data.name}</title>
            </Helmet>

            <Debugger name='author' data={data} />
            {error && <Debugger name='error' data={error} />}

            <Section className='flex flex-col gap-4'>
                <AuthorDetails author={data} />
            </Section>
        </Layout>
    );
};
