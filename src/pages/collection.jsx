import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from '@tanstack/react-router';
import { useParams, useNavigate } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';

import { getCollection, getTopics } from '@/services/bookworms';
import { cn } from '@/helpers/utils';
import { keyCase } from '@/helpers/strings';
import { Skeleton } from '@/ui/skeleton';

import { Layout } from '@/components/layout/layout';
import { SearchBox } from '@/components/layout/search-box';
import { BookCover } from '@/components/book/book-cover';
import { Eyebrow, PageInner, SearchBoxContainer, Divider } from '@/components/layout/primitives';
import { TopicChip } from '@/components/topic/topic-chip';

const CollectionBookEntry = ({ book, index }) => {
    const isEven = index % 2 === 0;
    const params = { libid: String(book.libid), title: keyCase(book.title) };

    return (
        <div
            className={cn(
                'flex flex-row items-start gap-5 md:gap-12 py-5 md:py-8 border-b border-border/50 last:border-b-0',
                !isEven && 'flex-row-reverse',
            )}
        >
            {/* Cover */}
            <Link
                to='/book/$libid/$title'
                params={params}
                className='w-24 md:w-52 shrink-0 self-start group'
            >
                <BookCover
                    book={book}
                    fluid
                    className='rounded-lg shadow-xl shadow-black/20 transition-transform duration-300 group-hover:-translate-y-1.5'
                />
            </Link>

            {/* Content */}
            <div className={cn('flex-1 min-w-0', !isEven && 'text-right')}>
                <span className='hidden md:block font-merriweather text-[clamp(56px,14vw,96px)] text-brand/[0.07] leading-[0.8] select-none mb-1'>
                    {String(index + 1).padStart(2, '0')}
                </span>

                <Link to='/book/$libid/$title' params={params} className='group block mb-2'>
                    <h2 className='font-merriweather font-extrabold text-[clamp(18px,3.5vw,26px)] text-foreground leading-tight group-hover:text-brand transition-colors duration-150'>
                        {book.title}
                    </h2>
                </Link>

                {book.authors?.length > 0 && (
                    <p className='text-xs uppercase tracking-widest text-muted-foreground font-noto mb-4 md:mb-6'>
                        {book.authors.map(a => a?.name ?? a).join(', ')}
                    </p>
                )}

                {book.why ? (
                    <div className={cn('border-brand/30 mb-4 md:mb-7', isEven ? 'border-l-2 pl-5' : 'border-r-2 pr-5')}>
                        <p className='font-merriweather italic text-[14px] md:text-[18px] leading-[1.2] text-foreground/70'>
                            {book.why}
                        </p>
                    </div>
                ) : (
                    <div className='mb-7' />
                )}

                <Link
                    to='/book/$libid/$title'
                    params={params}
                    className='inline-flex items-center gap-1.5 text-sm font-noto text-brand hover:gap-3 transition-all duration-200'
                >
                    Ver libro <span aria-hidden='true'>→</span>
                </Link>
            </div>
        </div>
    );
};

const CollectionSkeleton = () => (
    <Layout>
        <SearchBoxContainer>
            <SearchBox />
        </SearchBoxContainer>
        <PageInner>
            <Skeleton className='h-2 w-16 mb-4' />
            <Skeleton className='h-10 w-80 mb-3' />
            <Skeleton className='h-4 w-96 mb-10' />
            {[0, 1, 2].map(i => (
                <div
                    key={i}
                    className={cn(
                        'flex gap-12 py-12 border-b border-border/50',
                        i % 2 !== 0 && 'flex-row-reverse',
                    )}
                >
                    <Skeleton className='w-52 aspect-book rounded-lg shrink-0' />
                    <div className='flex-1 pt-2'>
                        <Skeleton className='h-16 w-20 mb-2 opacity-30' />
                        <Skeleton className='h-8 w-3/4 mb-3' />
                        <Skeleton className='h-3 w-1/3 mb-7' />
                        <Skeleton className='h-4 w-full mb-2' />
                        <Skeleton className='h-4 w-5/6 mb-2' />
                        <Skeleton className='h-4 w-2/3 mb-8' />
                        <Skeleton className='h-3 w-16' />
                    </div>
                </div>
            ))}
        </PageInner>
    </Layout>
);

export const Collection = () => {
    const { id } = useParams({ strict: false });
    const navigate = useNavigate();

    const { data, isLoading, isError } = useQuery(getCollection(id, { retry: 0 }));
    const { data: topics } = useQuery(getTopics({ limit: 3 }));

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

            <SearchBoxContainer>
                <SearchBox />
            </SearchBoxContainer>

            <PageInner>
                <div className='w-9 h-0.75 bg-brand rounded-full mb-4.5' />
                <Eyebrow className='mb-1.5'>Colección</Eyebrow>
                <h1 className='font-merriweather font-extrabold text-[clamp(24px,6vw,40px)] leading-tight text-foreground mb-3'>
                    {data.headline}
                </h1>
                {data.description && (
                    <p className='text-sm text-foreground/60 leading-relaxed font-noto mb-2 max-w-prose'>
                        {data.description}
                    </p>
                )}

                <p className='text-[11px] uppercase tracking-widest text-muted-foreground font-noto mb-10'>
                    {data.books?.length} {data.books?.length === 1 ? 'libro' : 'libros'}
                </p>

                <div className='flex flex-col'>
                    {[...(data.books ?? [])].sort((a, b) => (b.score ?? 0) - (a.score ?? 0)).map((book, i) => (
                        <CollectionBookEntry key={book.libid} book={book} index={i} />
                    ))}
                </div>
            </PageInner>

            {topics?.length > 0 && (
                <>
                    <Divider />
                    <PageInner className='flex flex-col gap-4'>
                        <Eyebrow>Sigue explorando otros temas</Eyebrow>
                        <div className='grid grid-cols-2 sm:grid-cols-3 gap-2'>
                            {topics.map((topic, i) => (
                                <div key={topic.id} className={cn(i >= 2 && 'hidden sm:block')}>
                                    <TopicChip topic={topic} />
                                </div>
                            ))}
                        </div>
                    </PageInner>
                </>
            )}
        </Layout>
    );
};
