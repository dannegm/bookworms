import { Helmet } from 'react-helmet';
import { useLocation } from 'wouter';
import { useQueryState, parseAsInteger } from 'nuqs';

import { LibraryBig, Tag } from 'lucide-react';

import { keyCase } from '@/modules/core/helpers/strings';
import { getCategory } from '@/modules/core/services/bookworms';

import { Debugger } from '@/modules/core/components/debugger';
import { DataLoader } from '@/modules/core/components/data-loader';

import { Layout } from '@/modules/main/components/layout';
import { Section } from '@/modules/main/components/section';
import { SearchBox } from '@/modules/main/components/search-box';
import { Pagination } from '@/modules/main/components/pagination';

import { CategoryDetails } from '@/modules/main/components/category-details';
import { CategoryDetailsLoading } from '@/modules/main/components/category-details-loading';

const getCategoryName = (key, data = []) => {
    if (data.length === 0) return 'Sin categoría';

    const found = data[0]?.labels.find(label => keyCase(label) === key);
    return found || 'Sin categoría';
};

export const Category = ({ params: { key } }) => {
    const [, navigate] = useLocation();
    const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(1));

    return (
        <Layout>
            <SearchBox />

            <DataLoader
                query={getCategory({ categoryName: key, page, limit: 12 })}
                tags={[`category`]}
                retry={0}
                onError={error => {
                    navigate('/404');
                }}
                loader={
                    <Section className='flex flex-col gap-4'>
                        <CategoryDetailsLoading />
                    </Section>
                }
                preventRefetch
            >
                {({ data, error }) => {
                    if (!data) return null;
                    if (data) {
                        const categoryName = getCategoryName(key, data.data);
                        return (
                            <>
                                <Helmet>
                                    <title>{categoryName}</title>
                                </Helmet>

                                <Debugger name='category' data={data} expanded />
                                {error && <Debugger name='error' data={error} />}

                                <Section>
                                    <header className='flex flex-row gap-4 items-center justify-between'>
                                        <h1 className='py-2 px-4 flex gap-2 items-center text-lg font-bold font-merriweather bg-blue-200 rounded-xl'>
                                            <Tag className='size-4' /> {categoryName}
                                        </h1>

                                        <div className='flex-center text-sm [&_svg]:size-4 bg-neutral-100 dark:bg-neutral-800 px-4 py-2 rounded-md'>
                                            <span className='flex flex-row gap-2 items-center'>
                                                <LibraryBig />
                                                <b>{data?.data.length}</b> libros
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
