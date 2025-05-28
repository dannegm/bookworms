import { useQueryState, parseAsInteger } from 'nuqs';

import { searchEntity } from '@/modules/core/services/bookworms';

import { Debugger } from '@/modules/core/components/debugger';
import { DataLoader } from '@/modules/core/components/data-loader';
import { Loader } from '@/modules/core/components/loader';

import { Layout } from '@/modules/main/components/layout';
import { Section } from '@/modules/main/components/section';
import { SearchBox } from '@/modules/main/components/search-box';

export const SearchBy = ({ params: { entity } }) => {
    const [query] = useQueryState('q', { defaultValue: '' });
    const [page] = useQueryState('page', parseAsInteger.withDefault(1));

    return (
        <Layout>
            <SearchBox />

            <DataLoader
                query={searchEntity({ entity, query, page, limit: 10 })}
                tags={[`search:${entity}`]}
                loader={<Loader />}
            >
                {({ data, error }) => (
                    <>
                        <Debugger name={entity} data={data} expanded />
                        {error && <Debugger name='error' data={error} />}

                        <Section className='flex flex-col gap-4'>
                            <header>
                                <h1 className='font-merriweather text-xl'>
                                    Resultados de <b>{query}</b>
                                </h1>
                            </header>
                        </Section>
                    </>
                )}
            </DataLoader>
        </Layout>
    );
};
