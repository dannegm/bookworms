import { cn } from '@/helpers/utils';
import { keyCase } from '@/helpers/strings';

export const SerieCard = ({ className, serie }) => (
    <a
        href={`/serie/${keyCase(serie.name)}`}
        className={cn(
            'group flex flex-col px-4 pt-4 pb-4 rounded-xl bg-muted/20',
            'hover:bg-muted/45 transition-colors',
            className,
        )}
    >
        <span className='block h-[2px] w-5 bg-brand/50 mb-3.5 group-hover:w-9 transition-all duration-300 ease-out' />

        <p className='font-merriweather font-normal text-[15px] leading-snug text-foreground line-clamp-2 flex-1 mb-3'>
            {serie.name}
        </p>

        {serie.books && (
            <p className='text-[11px] text-muted-foreground font-noto uppercase tracking-wide'>
                {serie.books} libros
            </p>
        )}
    </a>
);
