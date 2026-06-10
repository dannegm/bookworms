import { useQuery } from '@tanstack/react-query';
import { Link } from '@tanstack/react-router';
import { useQueryState } from 'nuqs';

import { searchEntity } from '@/services/bookworms';

import { Button } from '@/ui/button';

import { Debugger } from '@/components/system/debugger';

import { Layout } from '@/components/layout/layout';
import { PageInner, SearchBoxContainer } from '@/components/layout/primitives';
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
        searchEntity({ query, entity: 'books', limit: 6 }),
    );

    if (authorsLoading || seriesLoading || booksLoading) return (
        <Layout>
            <SearchBoxContainer><SearchBox /></SearchBoxContainer>
            <PageInner>
                <h1 className='font-merriweather text-xl'>
                    Resultados de <b>{query}</b>
                </h1>
            </PageInner>
            <PageInner className='flex flex-col gap-4'>
                <h2 className='font-bold'>Autores</h2>
                <AuthorsListLoading />
            </PageInner>
            <PageInner className='flex flex-col gap-4'>
                <h2 className='font-bold'>Series</h2>
                <SeriesListLoading />
            </PageInner>
            <PageInner className='flex flex-col gap-8'>
                <h2 className='font-bold'>Libros</h2>
                <BooksListLoading />
            </PageInner>
        </Layout>
    );

    return (
        <Layout>
            <SearchBoxContainer><SearchBox /></SearchBoxContainer>

            <PageInner>
                <h1 className='font-merriweather text-xl'>
                    Resultados de <b>{query}</b>
                </h1>
            </PageInner>

            <PageInner className='flex flex-col gap-4'>
                <h2 className='font-bold'>Autores</h2>

                {Boolean(authorsData?.pagination.found) &&
                    authorsData?.pagination.found > authorsData?.pagination.count && (
                        <h3 className='text-sm text-muted-foreground -mt-4'>
                            Mostrando {authorsData?.pagination.count} de{' '}
                            {authorsData?.pagination.found} encontrados
                        </h3>
                    )}

                {authorsError && <Debugger name='error' data={authorsError} simple />}
                <Debugger name='authors' data={authorsData} simple />

                <AuthorsList authors={authorsData?.data} />

                {Boolean(authorsData?.data?.length) && (
                    <Button className='self-start' asChild>
                        <Link to='/search/author' search={{ q: query }}>
                            Ver todos los autores
                        </Link>
                    </Button>
                )}
            </PageInner>

            <PageInner className='flex flex-col gap-4'>
                <h2 className='font-bold'>Series</h2>

                {Boolean(seriesData?.pagination.found) &&
                    seriesData?.pagination.found > seriesData?.pagination.count && (
                        <h3 className='text-sm text-muted-foreground -mt-4'>
                            Mostrando {seriesData?.pagination.count} de{' '}
                            {seriesData?.pagination.found} encontrados
                        </h3>
                    )}

                {seriesError && <Debugger name='error' data={seriesError} simple />}
                <Debugger name='series' data={seriesData} simple />

                <SeriesList series={seriesData?.data} />

                {Boolean(seriesData?.data?.length) && (
                    <Button className='self-start' asChild>
                        <Link to='/search/serie' search={{ q: query }}>
                            Ver todas las series
                        </Link>
                    </Button>
                )}
            </PageInner>

            <PageInner className='flex flex-col gap-8'>
                <h2 className='font-bold'>Libros</h2>

                {Boolean(booksData?.pagination.found) &&
                    booksData?.pagination.found > booksData?.pagination.count && (
                        <h3 className='text-sm text-muted-foreground -mt-8'>
                            Mostrando {booksData?.pagination.count} de{' '}
                            {booksData?.pagination.found} encontrados
                        </h3>
                    )}

                {booksError && <Debugger name='error' data={booksError} simple />}
                <Debugger name='books' data={booksData} simple />

                <BooksList books={booksData?.data} />

                {Boolean(booksData?.data?.length) && (
                    <Button className='self-start' asChild>
                        <Link to='/search/books' search={{ q: query }}>
                            Ver todos los libros
                        </Link>
                    </Button>
                )}
            </PageInner>
        </Layout>
    );
};
