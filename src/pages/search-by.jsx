import { useParams, Navigate } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { useQueryState, parseAsInteger } from 'nuqs';

import { match } from '@/helpers/utils';
import { searchEntity } from '@/services/bookworms';

import { Debugger } from '@/components/system/debugger';

import { Layout } from '@/components/layout/layout';
import { Section } from '@/components/layout/section';
import { SearchBox } from '@/components/layout/search-box';
import { Pagination } from '@/components/layout/pagination';

import { AuthorsListLoading } from '@/components/author/authors-list-loading';
import { SeriesListLoading } from '@/components/serie/series-list-loading';
import { BooksListLoading } from '@/components/book/books-list-loading';

import { AuthorsList } from '@/components/author/authors-list';
import { SeriesList } from '@/components/serie/series-list';
import { BooksList } from '@/components/book/books-list';

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

export const SearchBy = () => {
    const { entity } = useParams({ strict: false });
    const [query] = useQueryState('q', { defaultValue: '' });
    const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(1));

    const isValidEntity = validEntities.includes(entity);

    const { data, isLoading, error } = useQuery({
        ...searchEntity({ entity, query, page, limit: 12 }),
        enabled: isValidEntity,
    });

    if (!isValidEntity) return <Navigate to='/404' />;

    if (isLoading) return (
        <Layout key={page}>
            <SearchBox />
            <Section>
                <h1 className='font-merriweather text-xl'>
                    Resultados de <b>{query}</b>
                </h1>
            </Section>
            <Section className='flex flex-col gap-4'>
                <Loader entity={entity} />
            </Section>
        </Layout>
    );

    return (
        <Layout key={page}>
            <SearchBox />

            <Section>
                <h1 className='font-merriweather text-xl'>
                    Resultados de <b>{query}</b>
                </h1>
            </Section>

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
        </Layout>
    );
};
