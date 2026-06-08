import { cn } from '@/helpers/utils';
import { keyCase } from '@/helpers/strings';
import { SerieChip } from '@/components/serie/serie-chip';

export const SeriesList = ({ className, series = [] }) => {
    return (
        <div className={cn(className)}>
            {!Boolean(series.length) && <p className='text-gray-500'>No se encontraron series.</p>}

            <div className={cn('flex flex-row flex-wrap gap-2 sm:gap-4')}>
                {series.map(serie => (
                    <SerieChip key={`serie-${keyCase(serie.name)}`} serie={serie} />
                ))}
            </div>
        </div>
    );
};
