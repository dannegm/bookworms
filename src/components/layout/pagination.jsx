import { cn } from '@/helpers/utils';
import { clamp } from '@/helpers/maths';
import { sequence } from '@/helpers/arrays';

const getPages = (current, total, size = 5) => {
    const s = clamp(size, 1, total);
    if (current < s) return sequence(s).map(i => i + 1);
    if (current > total - s + 1) return sequence(s).map(i => total + i + 1 - s);
    const mid = Math.floor(s / 2);
    return sequence(s).map(i => current + i - mid);
};

export const Pagination = ({
    className,
    totalPages = 1,
    currentPage = 1,
    pagesShowed = 5,
    onChange,
}) => {
    const page = clamp(currentPage, 1, totalPages);
    const isFirst = page <= 1;
    const isLast = page >= totalPages;
    const pages = getPages(page, totalPages, pagesShowed);
    const showFirst = totalPages > pagesShowed && page >= pagesShowed;
    const showLast = totalPages > pagesShowed && page <= totalPages - pagesShowed + 1;

    const go = (n, ev) => { ev.preventDefault(); onChange(n); };
    const prev = ev => { ev.preventDefault(); if (!isFirst) onChange(page - 1); };
    const next = ev => { ev.preventDefault(); if (!isLast) onChange(page + 1); };

    const navBtn = 'inline-flex items-center gap-1.5 text-sm font-noto px-3 py-1.5 rounded-lg transition-colors';
    const pageBtn = 'inline-flex items-center justify-center size-8 rounded-lg text-sm font-noto transition-colors';

    return (
        <nav className={cn('flex items-center justify-between gap-4', className)}>
            <button
                onClick={prev}
                disabled={isFirst}
                className={cn(navBtn, isFirst
                    ? 'text-muted-foreground/40 cursor-not-allowed'
                    : 'text-foreground hover:bg-muted'
                )}
            >
                <span>←</span>
                <span className='hidden sm:inline'>Anterior</span>
            </button>

            <div className='flex items-center gap-1'>
                {showFirst && (
                    <>
                        <button onClick={ev => go(1, ev)} className={cn(pageBtn, 'text-muted-foreground hover:bg-muted')}>
                            1
                        </button>
                        <span className='text-muted-foreground/40 text-sm px-1'>…</span>
                    </>
                )}

                {pages.map(n => (
                    <button
                        key={n}
                        onClick={ev => go(n, ev)}
                        className={cn(pageBtn, n === page
                            ? 'bg-brand text-brand-foreground font-medium'
                            : 'text-muted-foreground hover:bg-muted'
                        )}
                    >
                        {n}
                    </button>
                ))}

                {showLast && (
                    <>
                        <span className='text-muted-foreground/40 text-sm px-1'>…</span>
                        <button onClick={ev => go(totalPages, ev)} className={cn(pageBtn, 'text-muted-foreground hover:bg-muted')}>
                            {totalPages}
                        </button>
                    </>
                )}
            </div>

            <button
                onClick={next}
                disabled={isLast}
                className={cn(navBtn, isLast
                    ? 'text-muted-foreground/40 cursor-not-allowed'
                    : 'text-foreground hover:bg-muted'
                )}
            >
                <span className='hidden sm:inline'>Siguiente</span>
                <span>→</span>
            </button>
        </nav>
    );
};
