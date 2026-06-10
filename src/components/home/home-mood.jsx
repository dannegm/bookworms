import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';

import { getTopics } from '@/services/bookworms';
import { TopicChip, TopicChipSkeleton } from '@/components/topic/topic-chip';
import { Eyebrow, PageInner } from '@/components/home/home-primitives';

const DISPLAY_COUNT = 6;

export const HomeMood = () => {
    const { data, isLoading } = useQuery(getTopics({ limit: DISPLAY_COUNT }));

    const topics = useMemo(
        () => (data ? [...data].sort((a, b) => (b.times_used ?? 0) - (a.times_used ?? 0)) : []),
        [data],
    );

    if (isLoading) {
        return (
            <PageInner>
                <Eyebrow className='mb-3'>¿Qué quieres leer hoy?</Eyebrow>
                <div className='grid grid-cols-2 sm:grid-cols-3 gap-2'>
                    {Array.from({ length: DISPLAY_COUNT }).map((_, i) => (
                        <TopicChipSkeleton key={i} />
                    ))}
                </div>
            </PageInner>
        );
    }

    if (!topics.length) return null;

    return (
        <PageInner>
            <Eyebrow className='mb-3'>¿Qué quieres leer hoy?</Eyebrow>
            <div className='grid grid-cols-2 sm:grid-cols-3 gap-2'>
                {topics.map(topic => (
                    <TopicChip key={topic.id} topic={topic} />
                ))}
            </div>
        </PageInner>
    );
};
