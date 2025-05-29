import { LibraryBig } from 'lucide-react';
import { cn } from '@/modules/core/helpers/utils';
import { keyCase } from '@/modules/core/helpers/strings';

export const SerieChip = ({ className, serie }) => {
    return (
        <a
            className={cn(
                'py-2 pl-3 pr-4 flex gap-2 items-center bg-neutral-200 hover:bg-neutral-300 rounded-full text-sm [&_svg]:size-4',
                'dark:bg-neutral-800 dark:hover:bg-neutral-700',
                className,
            )}
            href={`/serie/${keyCase(serie.name)}`}
        >
            <LibraryBig />
            {serie.name}
        </a>
    );
};
