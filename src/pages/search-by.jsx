import { useParams, Navigate } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { useQueryState, parseAsInteger } from 'nuqs';

import { match } from '@/helpers/utils';
import { searchEntity } from '@/services/bookworms';

import { Debugger } from '@/components/system/debugger';

import { Layout } from '@/components/layout/layout';
import { PageInner, SearchBoxContainer, Divider } from '@/components/layout/primitives';
import { SearchBox } from '@/components/layout/search-box';
import { SearchEmpty } from '@/components/layout/search-empty';
import { Pagination } from '@/components/layout/pagination';

import { AuthorCard } from '@/components/author/author-card';
import { AuthorRow } from '@/components/author/author-row';
import { AuthorsListLoading } from '@/components/author/authors-list-loading';
import { SerieCard } from '@/components/serie/serie-card';
import { SerieRow } from '@/components/serie/serie-row';
import { SeriesListLoading } from '@/components/serie/series-list-loading';
import { BookCard } from '@/components/book/book-card';
import { BookRow } from '@/components/book/book-row';
import { BooksListLoading } from '@/components/book/books-list-loading';

const validEntities = ['author', 'serie', 'books'];

const entityLimits = {
    author: 16,
    serie: 25,
    books: 16,
};

const entityLabels = {
    author: 'Autores',
    serie: 'Series',
    books: 'Libros',
};

const PageHeader = ({ entity, query, count }) => (
    <PageInner className='pb-4'>
        <p className='text-xs uppercase tracking-widest text-brand font-noto mb-2'>
            {entityLabels[entity]}
        </p>
        <h1 className='font-merriweather font-normal text-[clamp(24px,6vw,36px)] leading-[1.1] text-foreground mb-3'>
            "{query}"
        </h1>
        {count != null && (
            <p className='text-sm text-muted-foreground font-noto'>
                {count} resultado{count !== 1 ? 's' : ''}
            </p>
        )}
    </PageInner>
);

const Loader = ({ entity }) => match({ entity })
    .with({ entity: 'author' }, () => <AuthorsListLoading items={16} />)
    .with({ entity: 'serie' }, () => <SeriesListLoading items={25} variant='cards' />)
    .with({ entity: 'books' }, () => <BooksListLoading items={16} />)
    .run();

const AuthorResults = ({ authors = [] }) => {
    const cardCount = authors.length <= 4 ? authors.length : authors.length <= 11 ? 4 : 8;
    const cards = authors.slice(0, cardCount);
    const rows = authors.slice(cardCount);

    return (
        <div className='flex flex-col gap-6'>
            <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5'>
                {cards.map(author => <AuthorCard key={author.name} author={author} />)}
            </div>
            {rows.length > 0 && (
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-x-6'>
                    {rows.map(author => <AuthorRow key={author.name} author={author} />)}
                </div>
            )}
        </div>
    );
};

const SerieResults = ({ series = [] }) => {
    const cardCount = series.length <= 9 ? 3 : 6;
    const cards = series.slice(0, cardCount);
    const rows = series.slice(cardCount);

    return (
        <div className='flex flex-col gap-6'>
            <div className='grid grid-cols-2 sm:grid-cols-3 gap-2.5'>
                {cards.map(serie => <SerieCard key={serie.name} serie={serie} />)}
            </div>
            {rows.length > 0 && (
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-x-6'>
                    {rows.map((serie, i) => <SerieRow key={serie.name} serie={serie} index={cardCount + i} />)}
                </div>
            )}
        </div>
    );
};

const BookResults = ({ books = [] }) => {
    const featuredCount = books.length > 8 ? 8 : 4;
    const featured = books.slice(0, featuredCount);
    const rows = books.slice(featuredCount);

    return (
        <div className='flex flex-col gap-6'>
            <div className='grid grid-cols-2 sm:grid-cols-4 gap-2.5'>
                {featured.map(book => <BookCard key={book.libid} book={book} />)}
            </div>
            {rows.length > 0 && (
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-x-6'>
                    {rows.map(book => <BookRow key={book.libid} book={book} />)}
                </div>
            )}
        </div>
    );
};

const ResultsList = ({ entity, data }) => match({ entity })
    .with({ entity: 'author' }, () => <AuthorResults authors={data?.data} />)
    .with({ entity: 'serie' }, () => <SerieResults series={data?.data} />)
    .with({ entity: 'books' }, () => <BookResults books={data?.data} />)
    .run();

export const SearchBy = () => {
    const { entity } = useParams({ strict: false });
    const [query] = useQueryState('q', { defaultValue: '' });
    const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(1));

    const isValidEntity = validEntities.includes(entity);
    const limit = entityLimits[entity] ?? 12;

    const { data, isLoading, error } = useQuery({
        ...searchEntity({ entity, query, page, limit }),
        enabled: isValidEntity,
    });

    if (!isValidEntity) return <Navigate to='/404' />;

    if (!query) return (
        <Layout>
            <SearchBoxContainer><SearchBox /></SearchBoxContainer>
            <SearchEmpty />
        </Layout>
    );

    if (isLoading) return (
        <Layout key={page}>
            <SearchBoxContainer><SearchBox /></SearchBoxContainer>
            <PageHeader entity={entity} query={query} />
            <Divider />
            <PageInner>
                <Loader entity={entity} />
            </PageInner>
        </Layout>
    );

    const totalFound = data?.pagination?.found ?? 0;
    const totalPages = data?.pagination?.pages ?? 0;

    return (
        <Layout key={page}>
            <SearchBoxContainer><SearchBox /></SearchBoxContainer>

            <PageHeader entity={entity} query={query} count={totalFound} />

            <Divider />

            <PageInner className='flex flex-col gap-4'>
                <Debugger name={entity} data={data} expanded simple />
                {error && <Debugger name='error' data={error} simple />}
                <ResultsList entity={entity} data={data} />
            </PageInner>

            {totalPages > 1 && (
                <>
                    <Divider />
                    <PageInner>
                        <Pagination
                            currentPage={page}
                            totalPages={totalPages}
                            onChange={setPage}
                        />
                    </PageInner>
                </>
            )}
        </Layout>
    );
};
