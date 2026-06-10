import { BookOpenText } from 'lucide-react';

import { cn } from '@/helpers/utils';

const SearchForm = ({ variant }) => {
    const isHero = variant === 'hero';

    return (
        <form action='/search' method='get'>
            <div
                className={cn(
                    'flex items-center gap-2 border-[1.5px] border-border rounded-xl focus-within:border-brand transition-colors duration-150',
                    isHero ? 'pl-3.5 pr-1.5' : 'pl-3 pr-1',
                )}
            >
                <BookOpenText
                    className={cn(
                        'text-muted-foreground shrink-0',
                        isHero ? 'size-4.5' : 'size-4',
                    )}
                />
                <input
                    name='q'
                    type='text'
                    placeholder='Buscar por libro, autor o serie...'
                    className={cn(
                        'flex-1 min-w-0 bg-transparent border-none outline-none text-foreground placeholder:text-muted-foreground font-noto caret-brand',
                        isHero ? 'text-[15px] py-3.5' : 'text-sm py-2.5',
                    )}
                />
                <button
                    type='submit'
                    className={cn(
                        'text-brand hover:text-brand/80 font-medium shrink-0 transition-colors font-noto rounded-lg',
                        isHero ? 'text-sm py-2.25 px-2' : 'text-xs py-1.5 px-2',
                    )}
                >
                    Buscar
                </button>
            </div>
        </form>
    );
};

export const SearchBox = ({ variant = 'compact', className }) => {
    if (variant === 'hero') return <SearchForm variant='hero' />;

    return (
        <div className={cn('w-main mx-auto px-5 py-4 border-b border-border', className)}>
            <SearchForm variant='compact' />
        </div>
    );
};
