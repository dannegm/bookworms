import { getAuthor } from '@/modules/core/services/bookworms';

import { Debugger } from '@/modules/core/components/debugger';
import { DataLoader } from '@/modules/core/components/data-loader';

import { Layout } from '@/modules/main/components/layout';
import { Section } from '@/modules/main/components/section';
import { SearchBox } from '@/modules/main/components/search-box';

import { AuthorDetails } from '@/modules/main/components/author-details';
import { AuthorDetailsLoading } from '@/modules/main/components/author-details-loading';

export const Author = ({ params: { key } }) => {
    return (
        <Layout>
            <SearchBox />

            <DataLoader
                query={getAuthor(key)}
                tags={[`author`]}
                loader={
                    <Section className='flex flex-col gap-4'>
                        <AuthorDetailsLoading />
                    </Section>
                }
            >
                {({ data, error }) => (
                    <>
                        <Debugger name='author' data={data} />
                        {error && <Debugger name='error' data={error} />}

                        <Section className='flex flex-col gap-4'>
                            <AuthorDetails author={data} />
                        </Section>
                    </>
                )}
            </DataLoader>
        </Layout>
    );
};
