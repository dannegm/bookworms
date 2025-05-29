import { Eye, LibraryBig } from 'lucide-react';
import { cn } from '@/modules/core/helpers/utils';

import { BooksList } from '@/modules/main/components/books-list';

export const SerieDetails = ({ className, serie }) => {
    return (
        <div className={cn('flex flex-col gap-8', className)}>
            <header className='flex flex-col gap-4 items-center'>
                <h1 className='text-3xl font-bold font-merriweather'>{serie.name}</h1>

                <div
                    className={cn(
                        'grid grid-cols-2 gap-2 text-sm [&_svg]:size-4 bg-neutral-100 px-4 py-2 rounded-md',
                    )}
                >
                    <span className='flex flex-row gap-2 items-center'>
                        <LibraryBig />
                        <b>{serie.books.length}</b> páginas
                    </span>

                    <span className='flex flex-row gap-2 items-center'>
                        <Eye />
                        <b>{serie.views}</b> vistas
                    </span>
                </div>
            </header>

            <BooksList books={serie.books} />
        </div>
    );
};
