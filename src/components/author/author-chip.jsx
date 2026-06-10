import { cn } from '@/helpers/utils';
import { keyCase } from '@/helpers/strings';
import { AuthorAvatar } from '@/components/author/author-avatar';

export const AuthorChip = ({ className, author }) => (
    <a
        href={`/author/${keyCase(author.name)}`}
        className={cn(
            'inline-flex items-center gap-2 pl-1.5 pr-3 py-1 rounded-full bg-muted',
            'hover:bg-brand/10 hover:text-brand transition-colors',
            className,
        )}
    >
        <AuthorAvatar className='size-6' name={author.name} />
        <span className='text-xs font-noto text-foreground'>{author.name}</span>
    </a>
);
