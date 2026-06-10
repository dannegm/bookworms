import { Layout } from '@/components/layout/layout';
import { PageInner } from '@/components/layout/primitives';

export const NotFound = () => {
    return (
        <Layout>
            <PageInner className='flex flex-col pt-16 md:pt-32'>
                <h1 className='text-4xl tracking-tight -ml-0.5'>404</h1>
                <h2 className='text-base'>Not Found</h2>
            </PageInner>
        </Layout>
    );
};
