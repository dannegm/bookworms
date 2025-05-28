import { useQueryState } from 'nuqs';
import { Link } from 'wouter';

import { searchEntity } from '@/modules/core/services/bookworms';

import { Button } from '@/modules/shadcn/ui/button';

import { Debugger } from '@/modules/core/components/debugger';
import { DataLoader } from '@/modules/core/components/data-loader';

import { Layout } from '@/modules/main/components/layout';
import { Section } from '@/modules/main/components/section';
import { SearchBox } from '@/modules/main/components/search-box';

export const Search = () => {
    const [query] = useQueryState('q', { defaultValue: '' });

    return (
        <Layout>
            <SearchBox />
            <Debugger />

            <Section className='flex flex-col gap-4'>
                <header>
                    <h1 className='font-merriweather text-xl'>
                        Resultados de <b>{query}</b>
                    </h1>
                </header>

                <DataLoader
                    query={searchEntity({ query, entity: 'author', limit: 8 })}
                    tags={['search:author']}
                >
                    {({ data, error }) => (
                        <div className='flex flex-col gap-4'>
                            <h2 className='font-bold'>Autores</h2>
                            {error && <Debugger name='error' data={error} simple />}
                            <Debugger name='authors' data={data} simple />
                            <Button className='self-start' asChild>
                                <Link href={`/search/author?q=${query}`}>
                                    Ver todos los autores
                                </Link>
                            </Button>
                        </div>
                    )}
                </DataLoader>

                <DataLoader
                    query={searchEntity({ query, entity: 'serie', limit: 8 })}
                    tags={['search:serie']}
                >
                    {({ data, error }) => (
                        <div className='flex flex-col gap-4'>
                            <h2 className='font-bold'>Series</h2>
                            {error && <Debugger name='error' data={error} simple />}
                            <Debugger name='series' data={data} simple />
                            <Button className='self-start' asChild>
                                <Link href={`/search/serie?q=${query}`}>Ver todas las series</Link>
                            </Button>
                        </div>
                    )}
                </DataLoader>

                <DataLoader
                    query={searchEntity({ query, entity: 'books', limit: 8 })}
                    tags={['search:books']}
                >
                    {({ data, error }) => (
                        <div className='flex flex-col gap-4'>
                            <h2 className='font-bold'>Libros</h2>
                            {error && <Debugger name='error' data={error} simple />}
                            <Debugger name='books' data={data} simple />
                            <Button className='self-start' asChild>
                                <Link href={`/search/books?q=${query}`}>Ver todos los libros</Link>
                            </Button>
                        </div>
                    )}
                </DataLoader>
            </Section>
        </Layout>
    );
};
