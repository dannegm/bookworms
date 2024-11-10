import { cn } from '@/helpers/utils';
import { keyCase } from '@/helpers/strings';

import SeriePreview from './serie-preview';
import SerieChip from './serie-chip';

export default function SeriesLists({ className, title, series = [], limit = undefined }) {
    const largeResults = series.length > limit;

    return (
        <div className={cn(className)}>
            <h1 className='text-gray-500 font-bold text-medium mb-4'>{title}</h1>

            {!Boolean(series.length) && (
                <div className='block bg-slate-200 text-slate-700 py-4 px-6 text-small italic rounded-lg'>
                    <span>No se encontraron series para esta búsqueda</span>
                </div>
            )}

            {!largeResults && (
                <div className={cn('flex flex-row flex-wrap gap-4')}>
                    {series.map(serie => (
                        <SeriePreview key={`primary-serie-${keyCase(serie.name)}`} serie={serie} />
                    ))}
                </div>
            )}

            {largeResults && (
                <div className={cn('flex flex-row flex-wrap gap-4')}>
                    {series.map(serie => (
                        <SerieChip key={`primary-serie-${keyCase(serie.name)}`} serie={serie} />
                    ))}
                </div>
            )}
        </div>
    );
}
