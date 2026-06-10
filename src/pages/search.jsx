import { useQuery } from '@tanstack/react-query';
import { useQueryState } from 'nuqs';

import { searchEntity } from '@/services/bookworms';

import { Debugger } from '@/components/system/debugger';

import { Layout } from '@/components/layout/layout';
import { PageInner, SearchBoxContainer, Eyebrow, Divider } from '@/components/layout/primitives';
import { SearchBox } from '@/components/layout/search-box';
import { SearchEmpty } from '@/components/layout/search-empty';

import { AuthorsListLoading } from '@/components/author/authors-list-loading';
import { SeriesListLoading } from '@/components/serie/series-list-loading';
import { BooksListLoading } from '@/components/book/books-list-loading';

import { AuthorsList } from '@/components/author/authors-list';
import { SeriesList } from '@/components/serie/series-list';
import { BooksList } from '@/components/book/books-list';

export const Search = () => {
    const [query] = useQueryState('q', { defaultValue: '' });

    if (!query) return (
        <Layout>
            <SearchBoxContainer><SearchBox /></SearchBoxContainer>
            <SearchEmpty />
        </Layout>
    );

    const { data: authorsData, isLoading: authorsLoading, error: authorsError } = useQuery(
        searchEntity({ query, entity: 'author', limit: 6 }),
    );
    const { data: seriesData, isLoading: seriesLoading, error: seriesError } = useQuery(
        searchEntity({ query, entity: 'serie', limit: 8 }),
    );
    const { data: booksData, isLoading: booksLoading, error: booksError } = useQuery(
        searchEntity({ query, entity: 'books', limit: 8 }),
    );

    if (authorsLoading || seriesLoading || booksLoading) return (
        <Layout>
            <SearchBoxContainer><SearchBox /></SearchBoxContainer>
            <PageInner className='pb-4'>
                <p className='text-xs uppercase tracking-widest text-brand font-noto mb-2'>
                    Buscando…
                </p>
                <h1 className='font-merriweather font-normal text-[clamp(24px,6vw,36px)] leading-[1.1] text-foreground'>
                    "{query}"
                </h1>
            </PageInner>
            <Divider />
            <PageInner className='flex flex-col gap-3'>
                <Eyebrow>Autores</Eyebrow>
                <AuthorsListLoading />
            </PageInner>
            <Divider />
            <PageInner className='flex flex-col gap-4'>
                <Eyebrow>Series</Eyebrow>
                <SeriesListLoading />
            </PageInner>
            <Divider />
            <PageInner className='flex flex-col gap-8'>
                <Eyebrow>Libros</Eyebrow>
                <BooksListLoading />
            </PageInner>
        </Layout>
    );

    const authorsFound = authorsData?.pagination?.found ?? 0;
    const authorsShown = authorsData?.pagination?.count ?? 0;
    const seriesFound = seriesData?.pagination?.found ?? 0;
    const seriesShown = seriesData?.pagination?.count ?? 0;
    const booksFound = booksData?.pagination?.found ?? 0;
    const booksShown = booksData?.pagination?.count ?? 0;

    return (
        <Layout>
            <SearchBoxContainer><SearchBox /></SearchBoxContainer>

            <PageInner className='pb-4'>
                <p className='text-xs uppercase tracking-widest text-brand font-noto mb-2'>
                    Resultados para
                </p>
                <h1 className='font-merriweather font-normal text-[clamp(24px,6vw,36px)] leading-[1.1] text-foreground'>
                    "{query}"
                </h1>
            </PageInner>

            <Divider />

            <PageInner className='flex flex-col gap-3'>
                <div className='flex items-baseline justify-between gap-4'>
                    <Eyebrow>Autores</Eyebrow>
                    {authorsFound > authorsShown && (
                        <span className='text-[11px] text-muted-foreground font-noto'>
                            {authorsShown} de {authorsFound}
                        </span>
                    )}
                </div>

                {authorsError && <Debugger name='error' data={authorsError} simple />}
                <Debugger name='authors' data={authorsData} simple />

                <AuthorsList authors={authorsData?.data} />

                {Boolean(authorsData?.data?.length) && (
                    <a
                        href={`/search/author?q=${encodeURIComponent(query)}`}
                        className='text-sm text-brand hover:text-brand/75 font-noto inline-flex items-center gap-1 transition-colors self-start'
                    >
                        Ver todos los autores <span aria-hidden='true'>→</span>
                    </a>
                )}
            </PageInner>

            <Divider />

            <PageInner className='flex flex-col gap-4'>
                <div className='flex items-baseline justify-between gap-4'>
                    <Eyebrow>Series</Eyebrow>
                    {seriesFound > seriesShown && (
                        <span className='text-[11px] text-muted-foreground font-noto'>
                            {seriesShown} de {seriesFound}
                        </span>
                    )}
                </div>

                {seriesError && <Debugger name='error' data={seriesError} simple />}
                <Debugger name='series' data={seriesData} simple />

                <SeriesList series={seriesData?.data} />

                {Boolean(seriesData?.data?.length) && (
                    <a
                        href={`/search/serie?q=${encodeURIComponent(query)}`}
                        className='text-sm text-brand hover:text-brand/75 font-noto inline-flex items-center gap-1 transition-colors self-start'
                    >
                        Ver todas las series <span aria-hidden='true'>→</span>
                    </a>
                )}
            </PageInner>

            <Divider />

            <PageInner className='flex flex-col gap-8'>
                <div className='flex items-baseline justify-between gap-4'>
                    <Eyebrow>Libros</Eyebrow>
                    {booksFound > booksShown && (
                        <span className='text-[11px] text-muted-foreground font-noto'>
                            {booksShown} de {booksFound}
                        </span>
                    )}
                </div>

                {booksError && <Debugger name='error' data={booksError} simple />}
                <Debugger name='books' data={booksData} simple />

                <BooksList books={booksData?.data} />

                {Boolean(booksData?.data?.length) && (
                    <a
                        href={`/search/books?q=${encodeURIComponent(query)}`}
                        className='text-sm text-brand hover:text-brand/75 font-noto inline-flex items-center gap-1 transition-colors self-start'
                    >
                        Ver todos los libros <span aria-hidden='true'>→</span>
                    </a>
                )}
            </PageInner>
        </Layout>
    );
};
