import { Helmet } from 'react-helmet-async';
import { useParams, Link } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { useQueryState, parseAsInteger } from 'nuqs';

import { AlertCircleIcon, LibraryBig, Tag } from 'lucide-react';

import { keyCase, thousands } from '@/helpers/strings';
import { getCategory } from '@/services/bookworms';

import { Debugger } from '@/components/system/debugger';

import { Layout } from '@/components/layout/layout';
import { PageInner, SearchBoxContainer } from '@/components/layout/primitives';
import { SearchBox } from '@/components/layout/search-box';
import { Pagination } from '@/components/layout/pagination';

import { CategoryDetails } from '@/components/category/category-details';
import { CategoryDetailsLoading } from '@/components/category/category-details-loading';
import { Alert, AlertDescription, AlertTitle } from '@/ui/alert';
import { Button } from '@/ui/button';

const getCategoryName = (key, data = []) => {
    if (data.length === 0) return 'Sin categoría';
    const labels = data.flatMap(item => item.labels || []);
    const found = labels.find(label => keyCase(label) === key);
    return found || data[0].labels?.[0].split(' ')[0] || 'Sin categoría';
};

export const Category = () => {
    const { key } = useParams({ strict: false });
    const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(1));

    const { data, isLoading, error } = useQuery(getCategory({ categoryName: key, page, limit: 12, retry: 5 }));

    if (isLoading) return (
        <Layout>
            <SearchBoxContainer><SearchBox /></SearchBoxContainer>
            <PageInner className='flex flex-col gap-4'>
                <CategoryDetailsLoading />
            </PageInner>
        </Layout>
    );

    if (!data || error) return (
        <Layout>
            <SearchBoxContainer><SearchBox /></SearchBoxContainer>

            <Helmet>
                <title>Ups, algo salió mal...</title>
            </Helmet>

            <Debugger name='error' data={error} expanded />

            <PageInner className='flex flex-col gap-4'>
                <Alert variant='destructive'>
                    <AlertCircleIcon />
                    <AlertTitle>Ups, algo salió mal.</AlertTitle>
                    <AlertDescription>
                        <p>
                            Consultar categorías suele ser un proceso lento y a veces puede
                            fallar.
                            <br />
                            Por favor, inténtalos de nuevo.
                        </p>
                        <Button
                            className='mt-4 mb-2 border border-red-400'
                            variant='ghost'
                            asChild
                        >
                            <Link to={`/category/${key}`}>Repetir búsqueda</Link>
                        </Button>
                    </AlertDescription>
                </Alert>
            </PageInner>
        </Layout>
    );

    const categoryName = getCategoryName(key, data.data);

    return (
        <Layout>
            <SearchBoxContainer><SearchBox /></SearchBoxContainer>

            <Helmet>
                <title>{categoryName}</title>
            </Helmet>

            <Debugger name='category' data={data} expanded />

            <PageInner>
                <header className='flex flex-row gap-4 items-center justify-between'>
                    <h1 className='flex-center h-10 pl-3 pr-4 flex gap-2 items-center text-md font-bold font-merriweather bg-cyan-200 dark:bg-cyan-900 rounded-xl'>
                        <Tag className='size-4' /> {categoryName}
                    </h1>

                    <div className='flex-center text-sm [&_svg]:size-4 bg-neutral-100 dark:bg-neutral-800 px-4 py-2 rounded-md'>
                        <span className='flex flex-row gap-2 items-center'>
                            <LibraryBig />
                            <b>{thousands(data?.pagination.found)}</b> libros
                        </span>
                    </div>
                </header>
            </PageInner>

            <PageInner className='flex flex-col gap-4'>
                <CategoryDetails name='Novela' data={data?.data} />
            </PageInner>

            {data?.pagination.pages > 1 && (
                <PageInner>
                    <Pagination
                        currentPage={page}
                        totalPages={data?.pagination.pages || 0}
                        onChange={setPage}
                        onNext={() => setPage(page + 1)}
                        onPrev={() => setPage(page - 1)}
                    />
                </PageInner>
            )}
        </Layout>
    );
};
