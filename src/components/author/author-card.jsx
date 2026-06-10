import { BookOpen } from 'lucide-react';

import { cn } from '@/helpers/utils';
import { keyCase } from '@/helpers/strings';
import { AuthorAvatar } from '@/components/author/author-avatar';

export const AuthorCard = ({ className, author }) => (
    <a
        href={`/author/${keyCase(author.name)}`}
        className={cn(
            'group flex flex-col items-center text-center px-4 pt-7 pb-3.5 rounded-2xl bg-muted/25',
            'hover:bg-muted/55 transition-colors',
            className,
        )}
    >
        <AuthorAvatar
            className={cn(
                'size-20 mb-4 ring-2 ring-transparent transition-all duration-200',
                'group-hover:ring-brand/30 group-hover:scale-105',
            )}
            name={author.name}
        />

        <p className='font-merriweather font-normal text-[15px] text-foreground leading-snug mb-3 line-clamp-2'>
            {author.name}
        </p>

        <span className='inline-flex items-center gap-1 text-[11px] text-muted-foreground font-noto bg-background/70 border border-border/50 px-2.5 py-0.5 rounded-full'>
            <BookOpen className='size-3' />
            {author.books} libros
        </span>
    </a>
);
