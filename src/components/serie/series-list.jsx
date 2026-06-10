import { BookX } from 'lucide-react';

import { cn } from '@/helpers/utils';
import { keyCase } from '@/helpers/strings';

const SeriesEmpty = () => (
    <div className='flex items-center gap-4 px-4 py-5 rounded-xl border border-dashed border-border'>
        <div className='size-10 rounded-lg bg-muted flex items-center justify-center text-muted-foreground shrink-0'>
            <BookX className='size-5 stroke-[1.5]' />
        </div>
        <div>
            <p className='text-sm font-medium text-foreground font-noto leading-tight'>
                Sin resultados
            </p>
            <p className='text-xs text-muted-foreground font-noto mt-0.5 leading-relaxed'>
                No encontramos series que coincidan con tu búsqueda.
            </p>
        </div>
    </div>
);

const SerieRow = ({ serie, index }) => (
    <a
        href={`/serie/${keyCase(serie.name)}`}
        className='group flex items-center gap-4 py-3 border-b border-border/60 -mx-1 px-1 rounded-sm hover:bg-brand/5 transition-colors'
    >
        <span className='font-merriweather text-xl leading-none text-foreground/20 w-7 shrink-0 tabular-nums select-none'>
            {String(index + 1).padStart(2, '0')}
        </span>

        <div className='flex-1 min-w-0'>
            <p className='font-merriweather text-[15px] leading-tight text-foreground truncate'>
                {serie.name}
            </p>
            {serie.books && (
                <p className='text-xs text-muted-foreground font-noto mt-0.5'>
                    {serie.books} libros
                </p>
            )}
        </div>

        <span className='text-brand text-sm shrink-0 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all'>
            →
        </span>
    </a>
);

export const SeriesList = ({ className, series = [] }) => {
    if (!series.length) return <SeriesEmpty />;

    return (
        <div className={cn('grid grid-cols-1 sm:grid-cols-2 gap-x-6', className)}>
            {series.map((serie, index) => (
                <SerieRow key={`serie-${keyCase(serie.name)}`} serie={serie} index={index} />
            ))}
        </div>
    );
};
