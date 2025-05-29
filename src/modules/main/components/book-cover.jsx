import { useQuery } from '@tanstack/react-query';
import { cn } from '@/modules/core/helpers/utils';
import { getReferencedDownloadURL } from '@/modules/core/services/firebase';
import { Skeleton } from '@/modules/shadcn/ui/skeleton';

const DEFAULT_WIDTH = 340;
const DEFAULT_HEIGHT = 510;
const ASPECT_RATIO = DEFAULT_HEIGHT / DEFAULT_WIDTH;

const tailwindColors = [
    'dc2626', // red-600
    'd97706', // orange-600
    'ca8a04', // yellow-600
    '65a30d', // lime-600
    '059669', // emerald-600
    '047857', // teal-600
    '0d9488', // cyan-600
    '0891b2', // sky-600
    '2563eb', // blue-600
    '4f46e5', // indigo-600
    '7c3aed', // violet-600
    'a21caf', // purple-600
    'c026d3', // fuchsia-600
    'db2777', // pink-600
    'e11d48', // rose-600
];

const getRandomColor = () => {
    const randomIndex = Math.floor(Math.random() * tailwindColors.length);
    return tailwindColors[randomIndex];
};

const getDefaultCover = (book, width = DEFAULT_WIDTH) => {
    const height = Math.floor(width * ASPECT_RATIO);

    const title = encodeURI(
        chunk(book.title.substring(0, 50).split(' '), 3)
            .map(row => row.join(' '))
            .join('\\n') + (book.title.length >= 50 ? '...' : ''),
    );

    return {
        backgroundImage: `url(https://placehold.co/${width}x${height}/${getRandomColor()}/fff?font=playfair-display&text=${title})`,
        backgroundSize: `100%`,
        backgroundPosition: `center`,
    };
};

const getCoverStyles =
    (book, width = DEFAULT_WIDTH) =>
    async () => {
        const spriteWidth = 3;
        const spriteHeight = 3;

        if (!book.cover_id) {
            return getDefaultCover(book, width);
        }

        const imageNumber = (book.cover_id / (spriteWidth * spriteHeight)) | 0;
        const coverUrl = await getReferencedDownloadURL(`covers/${imageNumber}.webp`);

        if (!coverUrl) {
            return getDefaultCover(book, width);
        }

        const imgageX = book.cover_id % spriteWidth;
        const imgageY = ((book.cover_id / spriteWidth) | 0) % spriteHeight;

        return {
            backgroundImage: `url(${coverUrl})`,
            backgroundSize: `${spriteWidth * 100}% ${spriteWidth * 100}%`,
            backgroundPosition: `-${imgageX * 100}% -${imgageY * 100}%`,
        };
    };

export const BookCover = ({ className, book, width = DEFAULT_WIDTH, glowing = false }) => {
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
                    'w-full h-full absolute z-1 inset-0 ',
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
