import { Divider } from '@nextui-org/divider';

import { cn } from '@/helpers/utils';

import BookRegular from '@/components/icons/book-regular';
import EyeRegular from '@/components/icons/eye-regular';

import AuthorAvatar from './author-avatar';
import BooksList from './books-list';

export default function AuthorDetails({ className, author }) {
    return (
        <div className={cn(className)}>
            <div className='flex flex-col items-center gap-2'>
                <AuthorAvatar
                    className={cn(
                        'flex-none w-[200px] h-[200px] transition-all',
                        'hover:shadow-lg hover:scale-110',
                    )}
                    name={author.name}
                />

                <h3 className='mt-6 font-bold text-2xl text-slate-700'>{author.name}</h3>

                <div className='flex h-5 items-center gap-4 text-medium text-slate-500'>
                    <div className='flex flex-row gap-2 items-center'>
                        <BookRegular />
                        <b>{author.books.length}</b> Libros
                    </div>

                    <Divider orientation='vertical' />

                    <div className='flex flex-row gap-2 items-center'>
                        <EyeRegular />
                        <b>{author.views}</b> Vistas
                    </div>
                </div>
            </div>

            <BooksList className='mt-16' books={author.books} />
        </div>
    );
}
