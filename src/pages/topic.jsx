import { useEffect, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams, useNavigate } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { Hammer } from 'lucide-react';

import { getTopic, getTopicCollections, getTopics } from '@/services/bookworms';
import { Skeleton } from '@/ui/skeleton';

import { Layout } from '@/components/layout/layout';
import { SearchBox } from '@/components/layout/search-box';
import { DynamicIcon } from '@/components/system/dynamic-icon';
import { CollectionPreview } from '@/components/collection/collection-preview';
import { TopicChip, TopicChipSkeleton } from '@/components/topic/topic-chip';
import { Eyebrow, PageInner, SearchBoxContainer, Divider as HomeDivider } from '@/components/layout/primitives';

const pickRandom = (arr, count, excludeId) => {
    const pool = arr.filter(t => t.id !== excludeId);
    const copy = [...pool];
    for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy.slice(0, count);
};

const TopicEmpty = ({ currentId }) => {
    const { data: allTopics, isLoading } = useQuery(getTopics({ limit: 50 }));

    const suggested = useMemo(
        () => (allTopics ? pickRandom(allTopics, 3, currentId) : []),
        [allTopics, currentId],
    );

    return (
        <PageInner>
            <div className='flex flex-col items-center text-center py-6 mb-6'>
                <div className='size-14 rounded-2xl bg-brand/10 flex items-center justify-center text-brand mb-4'>
                    <Hammer className='size-6 stroke-1.5' />
                </div>
                <h3 className='font-merriweather font-normal text-lg text-foreground mb-2'>
                    El editor aún está en ello
                </h3>
                <p className='text-sm text-muted-foreground font-noto max-w-xs leading-relaxed'>
                    Estamos curado colecciones para este tema. Vuelve pronto, o mientras tanto explora alguno de estos temas.
                </p>
            </div>

            <Eyebrow className='mb-3'>Otros temas</Eyebrow>
            <div className='grid grid-cols-1 sm:grid-cols-3 gap-2 mb-6'>
                {isLoading
                    ? Array.from({ length: 3 }).map((_, i) => <TopicChipSkeleton key={i} />)
                    : suggested.map(topic => <TopicChip key={topic.id} topic={topic} />)
                }
            </div>

            <a
                href='/explore'
                className='group mt-2 flex items-center justify-between gap-4 rounded-xl border border-brand/25 bg-brand/8 px-5 py-4 hover:bg-brand/12 hover:border-brand/40 transition-colors'
            >
                <div>
                    <p className='text-sm font-medium text-foreground font-noto mb-0.5'>
                        Explorar toda la biblioteca
                    </p>
                    <p className='text-xs text-muted-foreground font-noto'>
                        Colecciones y temas curados para tu próxima lectura
                    </p>
                </div>
                <span className='text-brand text-lg shrink-0 transition-transform group-hover:translate-x-0.5'>→</span>
            </a>
        </PageInner>
    );
};

const TopicSkeleton = () => (
    <Layout>
        <SearchBoxContainer><SearchBox /></SearchBoxContainer>
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

            <SearchBoxContainer><SearchBox /></SearchBoxContainer>

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

            <HomeDivider />

            {collections.length > 0 ? (
                collections.map((collection, i) => (
                    <div key={collection.id}>
                        <CollectionPreview collection={collection} />
                        {i < collections.length - 1 && <HomeDivider />}
                    </div>
                ))
            ) : (
                <TopicEmpty currentId={data.id} />
            )}
        </Layout>
    );
};
