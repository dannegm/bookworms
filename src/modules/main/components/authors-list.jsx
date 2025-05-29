import { cn } from '@/modules/core/helpers/utils';
import { keyCase } from '@/modules/core/helpers/strings';

import { AuthorPreview } from '@/modules/main/components/author-preview';
import { AuthorChip } from '@/modules/main/components/author-chip';

export const AuthorsList = ({ className, authors = [], limit = 6 }) => {
    const largeResults = authors.length > limit;

    return (
        <div className={cn(className)}>
            {!Boolean(authors.length) && (
                <p className='text-gray-500'>No se encontraron autores.</p>
            )}

            {!largeResults && (
                <div className={cn('flex flex-row flex-wrap gap-4')}>
                    {authors.map(author => (
                        <AuthorPreview key={`author-${keyCase(author.name)}`} author={author} />
                    ))}
                </div>
            )}

            {largeResults && (
                <div className={cn('flex flex-row flex-wrap gap-4')}>
                    {authors.map(author => (
                        <AuthorChip key={`author-${keyCase(author.name)}`} author={author} />
                    ))}
                </div>
            )}
        </div>
    );
};
