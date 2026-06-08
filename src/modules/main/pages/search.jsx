import { useQuery } from '@tanstack/react-query';
import { Link } from '@tanstack/react-router';
import { useQueryState } from 'nuqs';

import { searchEntity } from '@/modules/core/services/bookworms';

import { Button } from '@/modules/shadcn/ui/button';

import { Debugger } from '@/modules/core/components/debugger';

import { Layout } from '@/modules/main/components/layout';
import { Section } from '@/modules/main/components/section';
import { SearchBox } from '@/modules/main/components/search-box';

import { AuthorsListLoading } from '@/modules/main/components/authors-list-loading';
import { SeriesListLoading } from '@/modules/main/components/series-list-loading';
import { BooksListLoading } from '@/modules/main/components/books-list-loading';

import { AuthorsList } from '@/modules/main/components/authors-list';
import { SeriesList } from '@/modules/main/components/series-list';
import { BooksList } from '@/modules/main/components/books-list';

export const Search = () => {
    const [query] = useQueryState('q', { defaultValue: '' });

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
            <SearchBox />
            <Section>
                <h1 className='font-merriweather text-xl'>
                    Resultados de <b>{query}</b>
                </h1>
            </Section>
            <Section className='flex flex-col gap-4'>
                <h2 className='font-bold'>Autores</h2>
                <AuthorsListLoading />
            </Section>
            <Section className='flex flex-col gap-4'>
                <h2 className='font-bold'>Series</h2>
                <SeriesListLoading />
            </Section>
            <Section className='flex flex-col gap-8'>
                <h2 className='font-bold'>Libros</h2>
                <BooksListLoading />
            </Section>
        </Layout>
    );

    return (
        <Layout>
            <SearchBox />

            <Section>
                <h1 className='font-merriweather text-xl'>
                    Resultados de <b>{query}</b>
                </h1>
            </Section>

            <Section className='flex flex-col gap-4'>
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
            </Section>

            <Section className='flex flex-col gap-4'>
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
            </Section>

            <Section className='flex flex-col gap-8'>
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
            </Section>
        </Layout>
    );
};
