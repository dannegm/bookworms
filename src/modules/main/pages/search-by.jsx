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

const Loader = ({ entity }) => {
    return match({ entity })
        .with({ entity: 'author' }, () => <AuthorsListLoading />)
        .with({ entity: 'serie' }, () => <SeriesListLoading />)
        .with({ entity: 'books' }, () => <BooksListLoading />)
        .run();
};

const ResultsList = ({ entity, data }) => {
    return match({ entity })
        .with({ entity: 'author' }, () => <AuthorsList authors={data?.data} limit={10} />)
        .with({ entity: 'serie' }, () => <SeriesList series={data?.data} />)
        .with({ entity: 'books' }, () => <BooksList books={data?.data} />)
        .run();
};

export const SearchBy = ({ params: { entity } }) => {
    const [query] = useQueryState('q', { defaultValue: '' });
    const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(1));

    return (
        <Layout key={page}>
            <SearchBox />

            <Section className='flex flex-col gap-4'>
                <header>
                    <h1 className='font-merriweather text-xl'>
                        Resultados de <b>{query}</b>
                    </h1>
                </header>

                <DataLoader
                    query={searchEntity({ entity, query, page, limit: 10 })}
                    tags={[`search:${entity}`]}
                    loader={<Loader entity={entity} />}
                >
                    {({ data, error }) => (
                        <>
                            <Debugger name={entity} data={data} expanded simple />
                            {error && <Debugger name='error' data={error} simple />}

                            <ResultsList entity={entity} data={data} />

                            {data?.pagination.pages > 1 && (
                                <Pagination
                                    currentPage={page}
                                    totalPages={data?.pagination.pages || 0}
                                    onChange={setPage}
                                    onNext={() => setPage(page + 1)}
                                    onPrev={() => setPage(page - 1)}
                                />
                            )}
                        </>
                    )}
                </DataLoader>
            </Section>
        </Layout>
    );
};
