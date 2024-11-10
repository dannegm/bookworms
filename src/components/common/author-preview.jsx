import { cn } from '@/helpers/utils';
import { keyCase } from '@/helpers/strings';

import BookRegular from '@/components/icons/book-regular';
import AuthorAvatar from './author-avatar';

export default async function AuthorPreview({ className, author }) {
    console.log({ author });
    return (
        <a
            href={`/author/${keyCase(author.name)}`}
            className={cn(
                'flex flex-row items-center gap-4 bg-slate-200 py-2 px-2 pr-6 rounded-full transition-all',
                'hover:shadow-xl active:shadow-sm',
                className,
            )}
        >
            <AuthorAvatar
                className={cn(
                    'flex-none w-[48px] h-[48px] transition-all',
                    'hover:shadow-lg hover:scale-110',
                )}
                name={author.name}
            />

            <div className=''>
                <h3 className='font-bold text-sm text-slate-700'>{author.name}</h3>
                <p className='-ml-[3px] flex flex-row gap-2 items-center text-sm text-slate-500'>
                    <BookRegular />
                    <b>{author.books}</b> Libros
                </p>
            </div>
        </a>
    );
}
