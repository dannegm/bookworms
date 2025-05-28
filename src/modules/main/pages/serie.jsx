import { getSerie } from '@/modules/core/services/bookworms';

import { Debugger } from '@/modules/core/components/debugger';
import { DataLoader } from '@/modules/core/components/data-loader';
import { Loader } from '@/modules/core/components/loader';

import { Layout } from '@/modules/main/components/layout';
import { Section } from '@/modules/main/components/section';
import { SearchBox } from '@/modules/main/components/search-box';

export const Serie = ({ params: { key } }) => {
    return (
        <Layout>
            <SearchBox />

            <DataLoader query={getSerie(key)} tags={[`serie`]} loader={<Loader />}>
                {({ data, error }) => (
                    <>
                        <Debugger name='serie' data={data} expanded />
                        {error && <Debugger name='error' data={error} />}

                        <Section className='flex flex-col gap-4'>
                            <header>
                                <h1 className='text-4xl tracking-tight -ml-0.5'>Serie</h1>
                                <h2>{key}</h2>
                            </header>
                        </Section>
                    </>
                )}
            </DataLoader>
        </Layout>
    );
};
