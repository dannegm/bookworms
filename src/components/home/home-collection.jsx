import { useQuery } from '@tanstack/react-query';

import { getLastCollection } from '@/services/bookworms';
import { Skeleton } from '@/ui/skeleton';

import { CollectionPreview } from '@/components/collection/collection-preview';
import { PageInner } from '@/components/home/home-primitives';

const CollectionSkeleton = () => (
    <PageInner>
        <Skeleton className='h-3 w-32 mb-3' />
        <Skeleton className='h-6 w-64 mb-2' />
        <Skeleton className='h-4 w-80 mb-4.5' />
        <div className='grid grid-cols-4 gap-2.5 mb-3.5'>
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

export const HomeCollection = () => {
    const { data, isLoading } = useQuery(getLastCollection({ retry: false }));

    if (isLoading) return <CollectionSkeleton />;
    if (!data) return null;

    return (
        <CollectionPreview
            collection={data}
            showEyebrow
            eyebrowLabel='Colección de la semana'
        />
    );
};
