import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';

import { getTopics } from '@/services/bookworms';
import { DynamicIcon } from '@/components/system/dynamic-icon';
import { Eyebrow, PageInner } from '@/components/home/home-primitives';
import { keyCase } from '@/helpers/strings';

const DISPLAY_COUNT = 6;

const pickRandom = (arr, count) => {
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy.slice(0, count);
};

const MoodChipSkeleton = () => (
    <div className='bg-card border border-border rounded-[10px] p-3.5 animate-pulse'>
        <div className='size-7 rounded bg-muted mb-2' />
        <div className='h-3 bg-muted rounded w-3/4 mb-1.5' />
        <div className='h-3 bg-muted rounded w-1/2' />
    </div>
);

const MoodChip = ({ topic }) => (
    <a
        href={`/topic/${topic.id}/${keyCase(topic.hint)}`}
        className='bg-card border border-border rounded-[10px] p-3.5 hover:border-brand transition-colors duration-150 block'
    >
        <div className='text-brand mb-2'>
            <DynamicIcon library={topic.icon?.library} name={topic.icon?.name} className='size-7 stroke-1' />
        </div>

        <div className='text-xs font-medium text-foreground font-noto'>{topic.hint}</div>
        <div className='text-[11px] text-muted-foreground mt-0.5 font-noto'>{topic.topic}</div>
    </a>
);

export const HomeMood = () => {
    const { data, isLoading } = useQuery(getTopics({ limit: 50 }));

    const topics = useMemo(
        () => (data ? pickRandom(data, DISPLAY_COUNT) : []),
        [data],
    );

    if (isLoading) {
        return (
            <PageInner>
                <Eyebrow className='mb-3'>¿Qué quieres leer hoy?</Eyebrow>
                <div className='grid grid-cols-2 sm:grid-cols-3 gap-2'>
                    {[...Array(DISPLAY_COUNT)].map((_, i) => (
                        <MoodChipSkeleton key={i} />
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
                {topics.map((topic) => (
                    <MoodChip key={topic.id} topic={topic} />
                ))}
            </div>
        </PageInner>
    );
};
