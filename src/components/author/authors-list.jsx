import { UserX } from 'lucide-react';

import { cn } from '@/helpers/utils';
import { keyCase } from '@/helpers/strings';

import { AuthorPreview } from '@/components/author/author-preview';
import { AuthorChip } from '@/components/author/author-chip';

const AuthorsEmpty = () => (
    <div className='flex items-center gap-4 px-4 py-5 rounded-xl border border-dashed border-border'>
        <div className='size-10 rounded-lg bg-muted flex items-center justify-center text-muted-foreground shrink-0'>
            <UserX className='size-5 stroke-[1.5]' />
        </div>
        <div>
            <p className='text-sm font-medium text-foreground font-noto leading-tight'>
                Sin resultados
            </p>
            <p className='text-xs text-muted-foreground font-noto mt-0.5 leading-relaxed'>
                No encontramos autores que coincidan con tu búsqueda.
            </p>
        </div>
    </div>
);

export const AuthorsList = ({ className, authors = [], limit = 6 }) => {
    const largeResults = authors.length > limit;

    if (!authors.length) return <AuthorsEmpty />;

    if (largeResults) return (
        <div className={cn('flex flex-row flex-wrap gap-2', className)}>
            {authors.map(author => (
                <AuthorChip key={`author-${keyCase(author.name)}`} author={author} />
            ))}
        </div>
    );

    return (
        <div className={cn('grid grid-cols-2 sm:grid-cols-3 gap-2', className)}>
            {authors.map(author => (
                <AuthorPreview key={`author-${keyCase(author.name)}`} author={author} />
            ))}
        </div>
    );
};
