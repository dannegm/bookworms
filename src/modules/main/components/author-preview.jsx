import { LibraryBig } from 'lucide-react';
import { cn } from '@/modules/core/helpers/utils';

import { keyCase } from '@/modules/core/helpers/strings';
import { AuthorAvatar } from '@/modules/main/components/author-avatar';

export const AuthorPreview = ({ className, author }) => {
    return (
        <a
            className={cn(
                'p-2 pr-6 bg-neutral-100 hover:bg-neutral-200 flex gap-4 items-center rounded-full',
                'dark:bg-neutral-800 dark:hover:bg-neutral-700',
                className,
            )}
            href={`/author/${keyCase(author.name)}`}
        >
            <AuthorAvatar name={author.name} />

            <div className='flex flex-col'>
                <h3 className='text-md'>{author.name}</h3>
                <p className='flex gap-1 items-center text-sm [&_svg]:size-4'>
                    <LibraryBig />
                    <b>{author.books}</b> Libros
                </p>
            </div>
        </a>
    );
};
