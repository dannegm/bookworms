import { LibraryBig } from 'lucide-react';
import { cn } from '@/modules/core/helpers/utils';

import { keyCase } from '@/modules/core/helpers/strings';
import { AuthorAvatar } from '@/modules/main/components/author-avatar';

export const AuthorPreview = ({ className, author }) => {
    return (
        <a
            className={cn(
                'p-1 sm:p-2 pr-4 sm:pr-6 bg-neutral-100 hover:bg-neutral-200 flex gap-2 sm:gap-4 items-center rounded-full',
                'dark:bg-neutral-800 dark:hover:bg-neutral-700',
                className,
            )}
            href={`/author/${keyCase(author.name)}`}
        >
            <AuthorAvatar className='size-10 sm:size-12' name={author.name} />

            <div className='flex flex-col'>
                <h3 className='text-sm sm:text-md'>{author.name}</h3>
                <p className='flex gap-1 items-center text-xs sm:text-sm [&_svg]:size-3 sm:[&_svg]:size-4'>
                    <LibraryBig />
                    <b>{author.books}</b> Libros
                </p>
            </div>
        </a>
    );
};
