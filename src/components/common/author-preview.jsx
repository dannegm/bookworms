import { cn } from '@/helpers/utils';
import { getAuthor } from '@/services/bookworms';
import BookRegular from '@/components/icons/book-regular';
import AuthorAvatar from './author-avatar';

export default async function AuthorPreview({ className, authorKey }) {
    const author = await getAuthor(authorKey);
    return (
        <div className={cn('flex flex-row items-center gap-4', className)}>
            <a href={`/author/${authorKey}`}>
                <AuthorAvatar
                    className={cn(
                        'flex-none w-[48px] h-[48px] transition-all',
                        'hover:shadow-lg hover:scale-110',
                    )}
                    name={author.name}
                />
            </a>
            <div className=''>
                <h3 className='font-bold text-sm text-slate-700'>
                    <a className='transition-all hover:underline' href={`/author/${authorKey}`}>
                        {author.name}
                    </a>
                </h3>
                <p className='-ml-[3px] flex flex-row gap-2 items-center text-sm text-slate-500'>
                    <BookRegular />
                    <b>{author.books.length}</b> Libros
                </p>
            </div>
        </div>
    );
}
