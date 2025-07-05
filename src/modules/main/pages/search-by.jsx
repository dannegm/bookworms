import { useQueryState, parseAsInteger } from 'nuqs';

import { match } from '@/modules/core/helpers/utils';
import { searchEntity } from '@/modules/core/services/bookworms';

import { Debugger } from '@/modules/core/components/debugger';
import { DataLoader } from '@/modules/core/components/data-loader';

import { Layout } from '@/modules/main/components/layout';
import { Section } from '@/modules/main/components/section';
import { SearchBox } from '@/modules/main/components/search-box';
import { Pagination } from '@/modules/main/components/pagination';

import { AuthorsListLoading } from '@/modules/main/components/authors-list-loading';
import { SeriesListLoading } from '@/modules/main/components/series-list-loading';
import { BooksListLoading } from '@/modules/main/components/books-list-loading';

import { AuthorsList } from '@/modules/main/components/authors-list';
import { SeriesList } from '@/modules/main/components/series-list';
import { BooksList } from '@/modules/main/components/books-list';
import { Redirect } from 'wouter';

const validEntities = ['author', 'serie', 'books'];
const entitiesTitles = {
    author: 'Autores',
    serie: 'Series',
    books: 'Libros',
};

const Loader = ({ entity }) => {
    return match({ entity })
        .with({ entity: 'author' }, () => <AuthorsListLoading />)
        .with({ entity: 'serie' }, () => <SeriesListLoading />)
        .with({ entity: 'books' }, () => <BooksListLoading />)
        .run();
};

const ResultsList = ({ entity, data }) => {
    return match({ entity })
        .with({ entity: 'author' }, () => <AuthorsList authors={data?.data} limit={12} />)
        .with({ entity: 'serie' }, () => <SeriesList series={data?.data} />)
        .with({ entity: 'books' }, () => <BooksList books={data?.data} />)
        .run();
};

export const SearchBy = ({ params: { entity } }) => {
    const [query] = useQueryState('q', { defaultValue: '' });
    const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(1));

    if (!validEntities.includes(entity)) {
        return <Redirect to='/404' />;
    }

    return (
        <Layout key={page}>
            <SearchBox />

            <Section>
                <h1 className='font-merriweather text-xl'>
                    Resultados de <b>{query}</b>
                </h1>
            </Section>
            <DataLoader
                query={searchEntity({ entity, query, page, limit: 12 })}
                tags={['search', entity, query, page]}
                loader={
                    <Section className='flex flex-col gap-4'>
                        <Loader entity={entity} />
                    </Section>
                }
                preventRefetch
            >
                {({ data, error }) => (
                    <>
                        <Section className='flex flex-col gap-4'>
                            <h2 className='font-bold'>{entitiesTitles[entity]}</h2>

                            <h3 className='text-sm text-muted-foreground -mt-4'>
                                Mostrando resultados del {data?.pagination.from} al{' '}
                                {Math.min(data?.pagination.to, data?.pagination.found)} de{' '}
                                {data?.pagination.found} encontrados
                            </h3>
                        </Section>

                        <Section className='flex flex-col gap-4 pb-8'>
                            <Debugger name={entity} data={data} expanded simple />
                            {error && <Debugger name='error' data={error} simple />}

                            <ResultsList entity={entity} data={data} />
                        </Section>

                        {data?.pagination.pages > 1 && (
                            <Section>
                                <Pagination
                                    currentPage={page}
                                    totalPages={data?.pagination.pages || 0}
                                    onChange={setPage}
                                    onNext={() => setPage(page + 1)}
                                    onPrev={() => setPage(page - 1)}
                                />
                            </Section>
                        )}
                    </>
                )}
            </DataLoader>
        </Layout>
    );
};
