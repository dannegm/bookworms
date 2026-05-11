import { useQuery } from '@tanstack/react-query';
import { cn } from '@/modules/core/helpers/utils';
import { Skeleton } from '@/modules/shadcn/ui/skeleton';

const BUCKET_URL = import.meta.env.NEXT_PUBLIC_BUCKET_URL;

const DEFAULT_WIDTH = 340;
const DEFAULT_HEIGHT = 510;
const ASPECT_RATIO = DEFAULT_HEIGHT / DEFAULT_WIDTH;

const tailwindColors = [
    'dc2626',
    'd97706',
    'ca8a04',
    '65a30d',
    '059669',
    '047857',
    '0d9488',
    '0891b2',
    '2563eb',
    '4f46e5',
    '7c3aed',
    'a21caf',
    'c026d3',
    'db2777',
    'e11d48',
];

const getRandomColor = () => tailwindColors[Math.floor(Math.random() * tailwindColors.length)];

const getDefaultCover = (book, width = DEFAULT_WIDTH) => {
    const height = Math.floor(width * ASPECT_RATIO);
    const title = encodeURI(
        chunk(book.title.substring(0, 50).split(' '), 3)
            .map(row => row.join(' '))
            .join('\\n') + (book.title.length >= 50 ? '...' : ''),
    );
    return {
        backgroundImage: `url(https://placehold.co/${width}x${height}/${getRandomColor()}/fff?font=playfair-display&text=${title})`,
        backgroundSize: '100%',
        backgroundPosition: 'center',
    };
};

const getCoverStyles =
    (book, width = DEFAULT_WIDTH) =>
    async () => {
        const spriteWidth = 3;
        const spriteHeight = 3;

        if (!book.cover_id) return getDefaultCover(book, width);

        const imageNumber = (book.cover_id / (spriteWidth * spriteHeight)) | 0;
        const coverUrl = `${BUCKET_URL}/bucket/${imageNumber}.webp`;

        const ok = await fetch(coverUrl, { method: 'HEAD' })
            .then(r => r.ok)
            .catch(() => false);
        if (!ok) return getDefaultCover(book, width);

        const imageX = book.cover_id % spriteWidth;
        const imageY = ((book.cover_id / spriteWidth) | 0) % spriteHeight;

        return {
            backgroundImage: `url(${coverUrl})`,
            backgroundSize: `${spriteWidth * 100}% ${spriteHeight * 100}%`,
            backgroundPosition: `-${imageX * 100}% -${imageY * 100}%`,
        };
    };

export const BookCoverTunnel = ({ className, book, width = DEFAULT_WIDTH, glowing = false }) => {
    const { data, isLoading } = useQuery({
        queryKey: [`book:cover:${book.libid}`],
        queryFn: getCoverStyles(book, width),
    });

    if (!data || isLoading) {
        return (
            <Skeleton
                className={cn('aspect-book rounded-lg', className)}
                style={{ width: `${width}px` }}
            />
        );
    }

    return (
        <div style={{ width: `${width}px` }} className={cn('relative aspect-book', className)}>
            <div
                style={{ ...data }}
                className={cn(
                    'rounded-lg bg-neutral-200 dark:bg-neutral-700',
                    'w-full h-full absolute z-1 inset-0',
                    className,
                )}
            />
            {glowing && (
                <div
                    style={{ ...data }}
                    className={cn(
                        'w-full h-full absolute z-0 inset-0 bg-inherit blur-xl',
                        className,
                    )}
                />
            )}
        </div>
    );
};
