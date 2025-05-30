import { Helmet } from 'react-helmet';
import { useLocation } from 'wouter';

import { getSerie } from '@/modules/core/services/bookworms';

import { Debugger } from '@/modules/core/components/debugger';
import { DataLoader } from '@/modules/core/components/data-loader';

import { Layout } from '@/modules/main/components/layout';
import { Section } from '@/modules/main/components/section';
import { SearchBox } from '@/modules/main/components/search-box';
import { SerieDetails } from '@/modules/main/components/serie-details';
import { SerieDetailsLoading } from '@/modules/main/components/serie-details-loading';

export const Serie = ({ params: { key } }) => {
    const [, navigate] = useLocation();

    return (
        <Layout>
            <SearchBox />

            <DataLoader
                query={getSerie(key)}
                tags={[`serie`]}
                retry={0}
                onError={error => {
                    navigate('/404');
                }}
                loader={
                    <Section className='flex flex-col gap-4'>
                        <SerieDetailsLoading />
                    </Section>
                }
            >
                {({ data, error }) =>
                    data && (
                        <>
                            <Helmet>
                                <title>{data.name}</title>
                            </Helmet>

                            <Debugger name='serie' data={data} expanded />
                            {error && <Debugger name='error' data={error} />}

                            <Section className='flex flex-col gap-4'>
                                <SerieDetails serie={data} />
                            </Section>
                        </>
                    )
                }
            </DataLoader>
        </Layout>
    );
};
