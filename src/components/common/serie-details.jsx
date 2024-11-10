import { Divider } from '@nextui-org/divider';

import { cn } from '@/helpers/utils';

import BookRegular from '@/components/icons/book-regular';
import EyeRegular from '@/components/icons/eye-regular';

import BooksList from './books-list';

export default function SerieDetails({ className, serie }) {
    return (
        <div className={cn(className)}>
            <div className='flex flex-col items-center gap-2'>
                <h3 className='mt-6 font-bold text-4xl text-slate-700'>{serie.name}</h3>

                <div className='flex h-5 items-center gap-4 text-medium text-slate-500'>
                    <div className='flex flex-row gap-2 items-center'>
                        <BookRegular />
                        <b>{serie.books.length}</b> Libros
                    </div>

                    <Divider orientation='vertical' />

                    <div className='flex flex-row gap-2 items-center'>
                        <EyeRegular />
                        <b>{serie.views}</b> Vistas
                    </div>
                </div>
            </div>

            <BooksList className='mt-16' books={serie.books} />
        </div>
    );
}
