import { Button } from '@nextui-org/button';

import { cn } from '@/helpers/utils';
import { keyCase } from '@/helpers/strings';

import PlusRegular from '../icons/plus-regular';
import SeriePreview from './serie-preview';

export default function SeriesLists({
    className,
    title,
    series = [],
    showRest = false,
    limit = undefined,
}) {
    const limitedSeries = limit ? series.slice(0, limit) : series;
    const restSeries = series.length > limit ? series.slice(limit) : [];

    return (
        <div className={cn(className)}>
            <h1 className='text-gray-500 font-bold text-medium mb-4'>{title}</h1>

            <div className={cn('flex flex-row flex-wrap gap-4')}>
                {limitedSeries.map(serie => (
                    <SeriePreview key={`primary-serie-${keyCase(serie.name)}`} serie={serie} />
                ))}

                {showRest && (
                    <>
                        {restSeries.map(serie => (
                            <SeriePreview key={`rest-serie-${keyCase(serie.name)}`} serie={serie} />
                        ))}
                    </>
                )}
            </div>

            {!showRest && (
                <div className='hidden mt-4'>
                    <Button radius='full' size='sm' startContent={<PlusRegular />}>
                        Ver todos los resultados
                    </Button>
                </div>
            )}
        </div>
    );
}
