import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams, useNavigate } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';

import { getTopic, getTopicCollections } from '@/services/bookworms';
import { Skeleton } from '@/ui/skeleton';

import { Layout } from '@/components/layout/layout';
import { SearchBox } from '@/components/layout/search-box';
import { DynamicIcon } from '@/components/system/dynamic-icon';
import { CollectionPreview } from '@/components/collection/collection-preview';
import { Eyebrow, PageInner, HomeDivider } from '@/components/home/home-primitives';

const TopicSkeleton = () => (
    <Layout>
        <SearchBox />
        <PageInner className='pb-6'>
            <Skeleton className='size-10 rounded-lg mb-4' />
            <Skeleton className='h-8 w-64 mb-2' />
            <Skeleton className='h-4 w-48' />
        </PageInner>
    </Layout>
);

export const Topic = () => {
    const { id } = useParams({ strict: false });
    const navigate = useNavigate();

    const { data, isLoading, isError } = useQuery(getTopic(id, { retry: 0 }));
    const { data: collections = [] } = useQuery(getTopicCollections(id, { enabled: !!data }));

    useEffect(() => {
        if (isError) navigate({ to: '/404' });
    }, [isError]);

    if (isLoading) return <TopicSkeleton />;
    if (!data) return null;

    return (
        <Layout>
            <Helmet>
                <title>{`${data.hint} — Bookworms`}</title>
            </Helmet>

            <SearchBox />

            <PageInner className='pb-6'>
                <div className='text-brand mb-4'>
                    <DynamicIcon
                        library={data.icon?.library}
                        name={data.icon?.name}
                        className='size-10 stroke-1'
                    />
                </div>
                <Eyebrow className='mb-1.5'>{data.topic}</Eyebrow>
                <h1 className='font-merriweather font-normal text-[clamp(28px,7vw,40px)] leading-[1.1] text-foreground'>
                    {data.hint}
                </h1>
            </PageInner>

            {collections.length > 0 && (
                <>
                    <HomeDivider />
                    {collections.map((collection, i) => (
                        <div key={collection.id}>
                            <CollectionPreview collection={collection} />
                            {i < collections.length - 1 && <HomeDivider />}
                        </div>
                    ))}
                </>
            )}
        </Layout>
    );
};
