import { cn } from '@/helpers/utils';
import { keyCase } from '@/helpers/strings';

export const SerieRow = ({ className, serie, index = 0 }) => (
    <a
        href={`/serie/${keyCase(serie.name)}`}
        className={cn(
            'group flex items-center gap-4 py-3 border-b border-border/60 -mx-1 px-1 rounded-sm hover:bg-brand/5 transition-colors',
            className,
        )}
    >
        <span className='font-merriweather text-xl leading-none text-brand/30 w-7 shrink-0 tabular-nums select-none'>
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
