import { useMemo } from 'react';

import { keyCase } from '@/helpers/strings';
import { CollectionBookItem } from '@/components/book/collection-book-item';
import { Eyebrow, SectionTitle, SectionDesc, PageInner } from '@/components/home/home-primitives';

const BOOKS_PER_COLLECTION = 4;

const pickRandom = (arr, count) => {
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy.slice(0, count);
};

export const CollectionPreview = ({ collection, eyebrowLabel = 'Colección', showEyebrow = false }) => {
    const books = useMemo(
        () => (collection.books ? pickRandom(collection.books, BOOKS_PER_COLLECTION) : []),
        [collection.books],
    );

    if (!books.length) return null;

    const href = `/collection/${collection.id}/${keyCase(collection.headline)}`;

    return (
        <PageInner>
            {showEyebrow && <Eyebrow className='mb-1.5'>{eyebrowLabel}</Eyebrow>}
            <SectionTitle className='mb-1.5'>{collection.headline}</SectionTitle>
            {collection.description && (
                <SectionDesc className='mb-4.5'>{collection.description}</SectionDesc>
            )}
            <div className='grid grid-cols-4 gap-2.5 mb-3.5 max-[400px]:grid-cols-2'>
                {books.map(book => (
                    <CollectionBookItem key={book.libid} book={book} />
                ))}
            </div>
            <a
                href={href}
                className='text-sm text-brand inline-flex items-center gap-1 font-noto hover:text-brand/80 transition-colors'
            >
                Ver colección completa <span aria-hidden='true'>→</span>
            </a>
        </PageInner>
    );
};
