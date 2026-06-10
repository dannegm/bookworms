import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams, useNavigate } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';

import { getCollection } from '@/services/bookworms';
import { Skeleton } from '@/ui/skeleton';

import { Layout } from '@/components/layout/layout';
import { SearchBox } from '@/components/layout/search-box';
import { CollectionBookItem } from '@/components/book/collection-book-item';
import { Eyebrow, SectionTitle, SectionDesc, PageInner, SearchBoxContainer } from '@/components/layout/primitives';

const CollectionSkeleton = () => (
    <Layout>
        <SearchBoxContainer><SearchBox /></SearchBoxContainer>
        <PageInner>
            <Skeleton className='h-3 w-24 mb-3' />
            <Skeleton className='h-8 w-72 mb-2' />
            <Skeleton className='h-4 w-96 mb-8' />
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3'>
                {Array.from({ length: 12 }).map((_, i) => (
                    <div key={i}>
                        <Skeleton className='aspect-book w-full rounded-lg mb-2' />
                        <Skeleton className='h-3 w-full mb-1' />
                        <Skeleton className='h-3 w-3/4' />
                    </div>
                ))}
            </div>
        </PageInner>
    </Layout>
);

export const Collection = () => {
    const { id } = useParams({ strict: false });
    const navigate = useNavigate();

    const { data, isLoading, isError } = useQuery(getCollection(id, { retry: 0 }));

    useEffect(() => {
        if (isError) navigate({ to: '/404' });
    }, [isError]);

    if (isLoading) return <CollectionSkeleton />;
    if (!data) return null;

    return (
        <Layout>
            <Helmet>
                <title>{data.headline} — Bookworms</title>
            </Helmet>

            <SearchBoxContainer><SearchBox /></SearchBoxContainer>

            <PageInner>
                <div className='w-9 h-0.75 bg-brand rounded-full mb-4.5' />
                <Eyebrow className='mb-1.5'>Colección</Eyebrow>
                <SectionTitle className='text-[clamp(24px,6vw,36px)] mb-2'>{data.headline}</SectionTitle>
                {data.description && (
                    <SectionDesc className='mb-8 max-w-prose'>{data.description}</SectionDesc>
                )}

                <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3'>
                    {data.books?.map(book => (
                        <CollectionBookItem key={book.libid} book={book} />
                    ))}
                </div>
            </PageInner>
        </Layout>
    );
};
