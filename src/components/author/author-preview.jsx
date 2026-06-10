import { cn } from '@/helpers/utils';
import { keyCase } from '@/helpers/strings';
import { AuthorAvatar } from '@/components/author/author-avatar';

export const AuthorPreview = ({ className, author }) => {
    return (
        <a
            href={`/author/${keyCase(author.name)}`}
            className={cn(
                'group flex items-center gap-3 px-3 py-2.5 rounded-xl bg-card border border-border',
                'hover:border-brand/35 hover:bg-brand/5 hover:shadow-sm hover:shadow-brand/10 transition-all',
                className,
            )}
        >
            <AuthorAvatar className='size-9 shrink-0' name={author.name} />

            <div className='min-w-0 flex-1'>
                <p className='text-sm font-medium text-foreground font-noto leading-tight truncate'>
                    {author.name}
                </p>
                <p className='text-xs text-muted-foreground font-noto mt-0.5'>
                    {author.books} libros
                </p>
            </div>

            <span className='text-brand text-sm shrink-0 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all'>
                →
            </span>
        </a>
    );
};
