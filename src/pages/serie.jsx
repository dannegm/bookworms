import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams, useNavigate } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';

import { getSerie } from '@/services/bookworms';

import { Debugger } from '@/components/system/debugger';

import { Layout } from '@/components/layout/layout';
import { Section } from '@/components/layout/section';
import { SearchBox } from '@/components/layout/search-box';
import { SerieDetails } from '@/components/serie/serie-details';
import { SerieDetailsLoading } from '@/components/serie/serie-details-loading';

export const Serie = () => {
    const { key } = useParams({ strict: false });
    const navigate = useNavigate();

    const { data, isLoading, isError, error } = useQuery(getSerie(key, { retry: 0 }));

    useEffect(() => {
        if (isError) navigate({ to: '/404' });
    }, [isError]);

    if (isLoading) return (
        <Layout>
            <SearchBox />
            <Section className='flex flex-col gap-4'>
                <SerieDetailsLoading />
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

            <Debugger name='serie' data={data} expanded />
            {error && <Debugger name='error' data={error} />}

            <Section className='flex flex-col gap-4'>
                <SerieDetails serie={data} />
            </Section>
        </Layout>
    );
};
