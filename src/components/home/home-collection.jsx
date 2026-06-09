import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';

import { getLastCollection } from '@/services/bookworms';
import { Skeleton } from '@/ui/skeleton';

import { CollectionBookItem } from '@/components/book/collection-book-item';
import { Eyebrow, SectionTitle, SectionDesc, PageInner } from '@/components/home/home-primitives';

const DISPLAY_COUNT = 4;

const CollectionSkeleton = () => (
    <PageInner>
        <Skeleton className='h-3 w-32 mb-3' />
        <Skeleton className='h-6 w-64 mb-2' />
        <Skeleton className='h-4 w-80 mb-4.5' />
        <div className='grid grid-cols-4 gap-2.5 mb-3.5'>
            {[0, 1, 2, 3].map((i) => (
                <div key={i}>
                    <Skeleton className='aspect-book w-full rounded-lg mb-2' />
                    <Skeleton className='h-3 w-full mb-1' />
                    <Skeleton className='h-3 w-3/4' />
                </div>
            ))}
        </div>
    </PageInner>
);

const pickRandom = (arr, count) => {
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy.slice(0, count);
};

export const HomeCollection = () => {
    const { data, isLoading } = useQuery(getLastCollection({ retry: false }));

    const books = useMemo(
        () => (data?.books ? pickRandom(data.books, DISPLAY_COUNT) : []),
        [data?.books],
    );

    if (isLoading) return <CollectionSkeleton />;
    if (!data) return null;

    return (
        <PageInner>
            <Eyebrow className='mb-1.5'>Colección de la semana</Eyebrow>
            <SectionTitle className='mb-1.5'>{data.headline}</SectionTitle>
            <SectionDesc className='mb-4.5'>{data.description}</SectionDesc>
            <div className='grid grid-cols-4 gap-2.5 mb-3.5 max-[400px]:grid-cols-2'>
                {books.map((book) => (
                    <CollectionBookItem key={book.libid} book={book} />
                ))}
            </div>
            <a
                href={`/collection/${data.id}`}
                className='text-sm text-brand inline-flex items-center gap-1 font-noto hover:text-brand/80 transition-colors'
            >
                Ver colección completa <span aria-hidden='true'>→</span>
            </a>
        </PageInner>
    );
};
