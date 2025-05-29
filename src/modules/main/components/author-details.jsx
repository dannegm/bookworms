import { Eye, LibraryBig } from 'lucide-react';
import { cn } from '@/modules/core/helpers/utils';

import { AuthorAvatar } from '@/modules/main/components/author-avatar';
import { BooksList } from '@/modules/main/components/books-list';

export const AuthorDetails = ({ className, author }) => {
    return (
        <div className={cn('flex flex-col gap-8', className)}>
            <header className='flex flex-col gap-4 items-center'>
                <AuthorAvatar className='size-32' name={author.name} />
                <h1 className='text-2xl font-bold font-merriweather'>{author.name}</h1>

                <div
                    className={cn(
                        'grid grid-cols-2 gap-2 text-sm [&_svg]:size-4 bg-neutral-100 px-4 py-2 rounded-md',
                    )}
                >
                    <span className='flex flex-row gap-2 items-center'>
                        <LibraryBig />
                        <b>{author.books.length}</b> páginas
                    </span>

                    <span className='flex flex-row gap-2 items-center'>
                        <Eye />
                        <b>{author.views}</b> vistas
                    </span>
                </div>
            </header>

            <BooksList books={author.books} />
        </div>
    );
};
