import { cn } from '@/helpers/utils';
import { keyCase } from '@/helpers/strings';
import Header from '@/components/common/header';
import SerieDetails from '@/components/common/serie-details';

export default async function SeriePage({ params }) {
    const { key } = await params;
    const serieKey = keyCase(key);

    return (
        <main className={cn('mx-4 mb-12', 'xl:w-[1000px] xl:mx-auto')}>
            <Header />
            <SerieDetails className='mt-12' serieKey={serieKey} />
        </main>
    );
}
