import { useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { useQuery } from '@tanstack/react-query';
import { useQueryState, parseAsInteger } from 'nuqs';

import { getTopics, getCollections } from '@/services/bookworms';
import { Skeleton } from '@/ui/skeleton';

import { Layout } from '@/components/layout/layout';
import { SearchBox } from '@/components/layout/search-box';
import { CollectionPreview } from '@/components/collection/collection-preview';
import { TopicChip, TopicChipSkeleton } from '@/components/topic/topic-chip';
import { Eyebrow, PageInner, HomeDivider } from '@/components/home/home-primitives';

const PAGE_SIZE = 4;
const TOP_TOPICS = 6;
const TOPICS_PER_ROW = 3;
const TOPIC_ROWS = 3;
const TOTAL_TOPICS = TOP_TOPICS + TOPIC_ROWS * TOPICS_PER_ROW; // 15

const CollectionRowSkeleton = () => (
    <PageInner>
        <Skeleton className='h-3 w-24 mb-3' />
        <Skeleton className='h-6 w-56 mb-2' />
        <Skeleton className='h-4 w-72 mb-4.5' />
        <div className='grid grid-cols-4 gap-2.5 max-[400px]:grid-cols-2'>
            {[0, 1, 2, 3].map(i => (
                <div key={i}>
                    <Skeleton className='aspect-book w-full rounded-lg mb-2' />
                    <Skeleton className='h-3 w-full mb-1' />
                    <Skeleton className='h-3 w-3/4' />
                </div>
            ))}
        </div>
    </PageInner>
);

const TopicRow = ({ topics }) => (
    <PageInner>
        <div className='grid grid-cols-2 sm:grid-cols-3 gap-2'>
            {topics.map(topic => <TopicChip key={topic.id} topic={topic} />)}
        </div>
    </PageInner>
);

export const Explore = () => {
    const [page] = useQueryState('page', parseAsInteger.withDefault(1));

    const { data: rawTopics, isLoading: topicsLoading } = useQuery(getTopics({ limit: TOTAL_TOPICS }));
    const { data, isLoading: collectionsLoading } = useQuery(getCollections({ page, limit: PAGE_SIZE }));

    const topics = useMemo(() => {
        if (!rawTopics) return [];
        return [...rawTopics].sort((a, b) => (b.times_used ?? 0) - (a.times_used ?? 0));
    }, [rawTopics]);

    const topTopics = topics.slice(0, TOP_TOPICS);
    const topicRows = [];
    for (let i = 0; i < TOPIC_ROWS; i++) {
        const chunk = topics.slice(TOP_TOPICS + i * TOPICS_PER_ROW, TOP_TOPICS + (i + 1) * TOPICS_PER_ROW);
        if (chunk.length) topicRows.push(chunk);
    }

    const collections = data?.data ?? [];
    const hasPrev = (data?.pagination?.page ?? 1) > 1;
    const hasNext = (data?.pagination?.page ?? 1) < (data?.pagination?.pages ?? 1);

    // Build interleaved list: col, topicRow, col, topicRow, ...
    const interleaved = [];
    for (let i = 0; i < collections.length; i++) {
        interleaved.push({ type: 'collection', data: collections[i] });
        if (topicRows[i]) interleaved.push({ type: 'topics', data: topicRows[i] });
    }

    return (
        <Layout>
            <Helmet>
                <title>Explorar — Bookworms</title>
            </Helmet>

            <SearchBox />

            <PageInner className='pb-4'>
                <div className='w-9 h-0.75 bg-brand rounded-full mb-4.5' />
                <h1 className='font-merriweather font-normal text-[clamp(28px,7vw,40px)] leading-[1.1] text-foreground mb-2'>
                    Explorar
                </h1>
                <p className='text-sm text-muted-foreground font-noto'>
                    Colecciones y temas curados por la biblioteca.
                </p>
            </PageInner>

            <HomeDivider />

            {/* Top topics grid */}
            <PageInner>
                <Eyebrow className='mb-3'>Explorar por tema</Eyebrow>
                <div className='grid grid-cols-2 sm:grid-cols-3 gap-2'>
                    {topicsLoading
                        ? Array.from({ length: TOP_TOPICS }).map((_, i) => <TopicChipSkeleton key={i} />)
                        : topTopics.map(topic => <TopicChip key={topic.id} topic={topic} />)
                    }
                </div>
            </PageInner>

            <HomeDivider />

            {/* Interleaved collections + topic rows */}
            {collectionsLoading ? (
                <>
                    {[0, 1, 2, 3].map(i => (
                        <div key={i}>
                            <CollectionRowSkeleton />
                            {i < 3 && <HomeDivider />}
                        </div>
                    ))}
                </>
            ) : (
                <>
                    {interleaved.map((item, i) => (
                        <div key={`${item.type}-${item.data?.id ?? i}`}>
                            {item.type === 'collection'
                                ? <CollectionPreview collection={item.data} />
                                : <TopicRow topics={item.data} />
                            }
                            {i < interleaved.length - 1 && <HomeDivider />}
                        </div>
                    ))}

                    {(hasPrev || hasNext) && (
                        <>
                            <HomeDivider />
                            <PageInner>
                                <div className='flex items-center gap-6'>
                                    {hasPrev && (
                                        <a
                                            href={`?page=${page - 1}`}
                                            className='text-sm text-brand font-noto hover:text-brand/80 transition-colors'
                                        >
                                            ← Anteriores
                                        </a>
                                    )}
                                    {hasNext && (
                                        <a
                                            href={`?page=${page + 1}`}
                                            className='text-sm text-brand font-noto hover:text-brand/80 transition-colors'
                                        >
                                            Más colecciones →
                                        </a>
                                    )}
                                </div>
                            </PageInner>
                        </>
                    )}
                </>
            )}
        </Layout>
    );
};
