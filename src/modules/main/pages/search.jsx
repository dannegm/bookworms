import { useQueryState } from 'nuqs';
import { Link } from 'wouter';

import { searchEntity } from '@/modules/core/services/bookworms';

import { Button } from '@/modules/shadcn/ui/button';

import { Debugger } from '@/modules/core/components/debugger';
import { DataLoader } from '@/modules/core/components/data-loader';

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

    return (
        <Layout>
            <SearchBox />

            <Section className='flex flex-col gap-4'>
                <header>
                    <h1 className='font-merriweather text-xl'>
                        Resultados de <b>{query}</b>
                    </h1>
                </header>

                <div className='flex flex-col gap-4'>
                    <h2 className='font-bold'>Autores</h2>
                    <DataLoader
                        query={searchEntity({ query, entity: 'author', limit: 6 })}
                        tags={['search:author']}
                        loader={<AuthorsListLoading />}
                    >
                        {({ data, error }) => (
                            <>
                                {error && <Debugger name='error' data={error} simple />}
                                <Debugger name='authors' data={data} simple />

                                <AuthorsList authors={data?.data} />

                                {Boolean(data?.data?.length) && (
                                    <Button className='self-start' asChild>
                                        <Link href={`/search/author?q=${query}`}>
                                            Ver todos los autores
                                        </Link>
                                    </Button>
                                )}
                            </>
                        )}
                    </DataLoader>
                </div>

                <div className='flex flex-col gap-4'>
                    <h2 className='font-bold'>Series</h2>
                    <DataLoader
                        query={searchEntity({ query, entity: 'serie', limit: 8 })}
                        tags={['search:serie']}
                        loader={<SeriesListLoading />}
                    >
                        {({ data, error }) => (
                            <>
                                {error && <Debugger name='error' data={error} simple />}
                                <Debugger name='series' data={data} simple />

                                <SeriesList series={data?.data} />

                                {Boolean(data?.data?.length) && (
                                    <Button className='self-start' asChild>
                                        <Link href={`/search/serie?q=${query}`}>
                                            Ver todas las series
                                        </Link>
                                    </Button>
                                )}
                            </>
                        )}
                    </DataLoader>
                </div>

                <div className='flex flex-col gap-8'>
                    <h2 className='font-bold'>Libros</h2>
                    <DataLoader
                        query={searchEntity({ query, entity: 'books', limit: 6 })}
                        tags={['search:books']}
                        loader={<BooksListLoading />}
                    >
                        {({ data, error }) => (
                            <>
                                {error && <Debugger name='error' data={error} simple />}
                                <Debugger name='books' data={data} simple />

                                <BooksList books={data?.data} />

                                {Boolean(data?.data?.length) && (
                                    <Button className='self-start' asChild>
                                        <Link href={`/search/books?q=${query}`}>
                                            Ver todos los libros
                                        </Link>
                                    </Button>
                                )}
                            </>
                        )}
                    </DataLoader>
                </div>
            </Section>
        </Layout>
    );
};
