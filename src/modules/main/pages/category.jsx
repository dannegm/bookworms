import { Helmet } from 'react-helmet';
import { useQueryState, parseAsInteger } from 'nuqs';

import { AlertCircleIcon, LibraryBig, Tag } from 'lucide-react';

import { keyCase, thousands } from '@/modules/core/helpers/strings';
import { getCategory } from '@/modules/core/services/bookworms';

import { Debugger } from '@/modules/core/components/debugger';
import { DataLoader } from '@/modules/core/components/data-loader';

import { Layout } from '@/modules/main/components/layout';
import { Section } from '@/modules/main/components/section';
import { SearchBox } from '@/modules/main/components/search-box';
import { Pagination } from '@/modules/main/components/pagination';

import { CategoryDetails } from '@/modules/main/components/category-details';
import { CategoryDetailsLoading } from '@/modules/main/components/category-details-loading';
import { Alert, AlertDescription, AlertTitle } from '@/modules/shadcn/ui/alert';
import { Button } from '@/modules/shadcn/ui/button';

const getCategoryName = (key, data = []) => {
    if (data.length === 0) return 'Sin categoría';
    const labels = data.flatMap(item => item.labels || []);
    const found = labels.find(label => keyCase(label) === key);
    return found || data[0].labels?.[0].split(' ')[0] || 'Sin categoría';
};

export const Category = ({ params: { key } }) => {
    const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(1));

    return (
        <Layout>
            <SearchBox />

            <DataLoader
                query={getCategory({ categoryName: key, page, limit: 12 })}
                tags={['category', key, `p${page}`]}
                retry={5}
                loader={
                    <Section className='flex flex-col gap-4'>
                        <CategoryDetailsLoading />
                    </Section>
                }
                preventRefetch
            >
                {({ data, error }) => {
                    if (!data || error) {
                        return (
                            <>
                                <Helmet>
                                    <title>Ups, algo salió mal...</title>
                                </Helmet>

                                <Debugger name='error' data={error} expanded />

                                <Section className='flex flex-col gap-4'>
                                    <Alert variant='destructive'>
                                        <AlertCircleIcon />
                                        <AlertTitle>Ups, algo salió mal.</AlertTitle>
                                        <AlertDescription>
                                            <p>
                                                Consultar categorías suele ser un proceso lento y a
                                                veces puede fallar.
                                                <br />
                                                Por favor, inténtalos de nuevo.
                                            </p>
                                            <Button
                                                className='mt-4 mb-2 border border-red-400'
                                                variant='ghost'
                                                asChild
                                            >
                                                <a href={`/category/${key}`}>Repetir búsqueda</a>
                                            </Button>
                                        </AlertDescription>
                                    </Alert>
                                </Section>
                            </>
                        );
                    }

                    if (data) {
                        const categoryName = getCategoryName(key, data.data);
                        return (
                            <>
                                <Helmet>
                                    <title>{categoryName}</title>
                                </Helmet>

                                <Debugger name='category' data={data} expanded />

                                <Section>
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
                                </Section>

                                <Section className='flex flex-col gap-4'>
                                    <CategoryDetails name='Novela' data={data?.data} />
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
                        );
                    }
                }}
            </DataLoader>
        </Layout>
    );
};
