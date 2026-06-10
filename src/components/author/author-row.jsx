import { BookOpen } from 'lucide-react';

import { cn } from '@/helpers/utils';
import { keyCase } from '@/helpers/strings';
import { AuthorAvatar } from '@/components/author/author-avatar';

export const AuthorRow = ({ className, author }) => (
    <a
        href={`/author/${keyCase(author.name)}`}
        className={cn(
            'group flex items-center gap-4 py-3.5 border-b border-border/60 -mx-1 px-1 rounded-sm last:border-0',
            'hover:bg-brand/5 transition-colors',
            className,
        )}
    >
        <AuthorAvatar className='size-12 shrink-0' name={author.name} />

        <div className='flex-1 min-w-0'>
            <p className='font-merriweather font-normal text-lg text-foreground leading-tight truncate'>
                {author.name}
            </p>
            <p className='flex items-center gap-1 text-xs text-muted-foreground font-noto mt-0.5'>
                <BookOpen className='size-3' />
                {author.books} libros
            </p>
        </div>

        <span className='text-brand text-sm shrink-0 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all'>
            →
        </span>
    </a>
);
