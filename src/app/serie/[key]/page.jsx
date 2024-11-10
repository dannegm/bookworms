import { redirect, RedirectType } from 'next/navigation';

import { cn } from '@/helpers/utils';
import { keyCase } from '@/helpers/strings';
import { retry } from '@/helpers/handlers';
import { getSerie } from '@/services/bookworms';

import Header from '@/components/common/header';
import SerieDetails from '@/components/common/serie-details';

const redundantGetSerie = async serieKey => {
    const [result, error] = await retry(() => getSerie(serieKey), { delay: 1000 });
    return [result, error];
};

export default async function SeriePage({ params }) {
    const { key } = await params;
    const serieKey = keyCase(key);

    const [serie, error] = await redundantGetSerie(serieKey);

    if (error) {
        return redirect('/404', RedirectType.replace);
    }

    return (
        <main className={cn('mx-4 mb-12', 'xl:w-[1000px] xl:mx-auto')}>
            <Header />
            <SerieDetails className='mt-12' serie={serie} />
        </main>
    );
}
