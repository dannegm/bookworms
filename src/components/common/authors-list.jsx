import { cn } from '@/helpers/utils';
import { keyCase } from '@/helpers/strings';

import AuthorPreview from './author-preview';
import AuthorChip from './author-chip';

export default function AuthorsList({ className, title, authors = [], limit = undefined }) {
    const largeResults = authors.length > limit;

    return (
        <div className={cn(className)}>
            <h1 className='text-gray-500 font-bold text-medium mb-4'>{title}</h1>

            {!Boolean(authors.length) && (
                <div className='block bg-slate-200 text-slate-700 py-4 px-6 text-small italic rounded-lg'>
                    <span>No se encontraron authores para esta búsqueda</span>
                </div>
            )}

            {!largeResults && (
                <div className={cn('flex flex-row flex-wrap gap-4')}>
                    {authors.map(author => (
                        <AuthorPreview
                            key={`primary-author-${keyCase(author.name)}`}
                            author={author}
                        />
                    ))}
                </div>
            )}

            {largeResults && (
                <div className={cn('flex flex-row flex-wrap gap-4')}>
                    {authors.map(author => (
                        <AuthorChip
                            key={`primary-author-${keyCase(author.name)}`}
                            author={author}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
