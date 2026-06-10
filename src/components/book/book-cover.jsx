import { Heart } from 'lucide-react';

import { cn } from '@/helpers/utils';
import { useFavorites } from '@/hooks/use-local-list';
import { BookCoverFirebase } from '@/components/book/book-cover-firebase';
import { BookCoverTunnel } from '@/components/book/book-cover-tunnel';

const DEFAULT_VENDOR = import.meta.env.NEXT_PUBLIC_COVER_VENDOR ?? 'tunnel';

const vendors = {
    firebase: BookCoverFirebase,
    tunnel: BookCoverTunnel,
};

export const BookCover = ({ vendor = DEFAULT_VENDOR, book, className, ...props }) => {
    const Component = vendors[vendor] ?? BookCoverTunnel;
    const [, { has: isFavorite }] = useFavorites();
    const favorited = isFavorite(book?.libid);

    return (
        <div className={cn('relative', className)}>
            <Component book={book} {...props} />
            {favorited && (
                <div className='absolute top-2 right-2 size-6 rounded-full bg-rose-900/50 backdrop-blur-sm flex items-center justify-center pointer-events-none z-10'>
                    <Heart className='size-3.5 fill-rose-400 text-rose-400' />
                </div>
            )}
        </div>
    );
};
