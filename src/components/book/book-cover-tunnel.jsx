import { useQuery } from '@tanstack/react-query';
import { cn } from '@/helpers/utils';
import { Skeleton } from '@/ui/skeleton';

const BUCKET_URL = import.meta.env.NEXT_PUBLIC_BUCKET_URL;

const DEFAULT_WIDTH = 340;

const GRADIENTS = [
    'linear-gradient(160deg, #1e0f2e, #4a1a6e)',
    'linear-gradient(160deg, #0d2218, #1a5c38)',
    'linear-gradient(160deg, #2a0808, #8a2020)',
    'linear-gradient(160deg, #0a1828, #1a4878)',
    'linear-gradient(160deg, #1a1008, #5c3218)',
    'linear-gradient(160deg, #08181a, #0d4848)',
    'linear-gradient(160deg, #1a0820, #5a1a7a)',
    'linear-gradient(160deg, #181200, #6a500a)',
    'linear-gradient(160deg, #080818, #18186a)',
    'linear-gradient(160deg, #180810, #6a1040)',
];

const getGradient = (book) => GRADIENTS[book.libid % GRADIENTS.length];

const imageExists = url =>
    new Promise(resolve => {
        const img = new Image();
        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);
        img.src = url;
    });

const getCoverStyles = (book) => async () => {
    const spriteWidth = 4;
    const spriteHeight = 3;

    if (!book.cover_id) return { ok: false };

    const imageNumber = (book.cover_id / (spriteWidth * spriteHeight)) | 0;
    const coverUrl = `${BUCKET_URL}/bucket/${imageNumber}.webp`;

    const ok = await imageExists(coverUrl);
    if (!ok) return { ok: false };

    const imageX = book.cover_id % spriteWidth;
    const imageY = ((book.cover_id / spriteWidth) | 0) % spriteHeight;

    return {
        ok: true,
        backgroundImage: `url(${coverUrl})`,
        backgroundSize: `${spriteWidth * 100}% ${spriteHeight * 100}%`,
        backgroundPosition: `-${imageX * 100}% -${imageY * 100}%`,
    };
};

export const BookCoverTunnel = ({ className, book, width = DEFAULT_WIDTH, fluid = false, glowing = false }) => {
    const { data, isLoading } = useQuery({
        queryKey: [`book:cover:${book.libid}`],
        queryFn: getCoverStyles(book),
    });

    const sizeStyle = fluid ? { width: '100%' } : { width: `${width}px` };

    if (!data || isLoading) {
        return (
            <Skeleton
                className={cn('aspect-book rounded-lg', className)}
                style={sizeStyle}
            />
        );
    }

    if (!data.ok) {
        return (
            <div
                style={{ ...sizeStyle, background: getGradient(book) }}
                className={cn('aspect-book rounded-lg overflow-hidden', className)}
            >
                <div className='w-full h-full flex items-end p-4'>
                    <span className='text-sm text-white/85 leading-snug font-merriweather text-balance'>
                        {book.title}
                    </span>
                </div>
            </div>
        );
    }

    const { ok: _ok, ...bgStyles } = data;

    return (
        <div style={sizeStyle} className={cn('relative aspect-book', className)}>
            <div
                style={bgStyles}
                className={cn(
                    'rounded-lg bg-neutral-200 dark:bg-neutral-700',
                    'w-full h-full absolute z-1 inset-0',
                    className,
                )}
            />
            {glowing && (
                <div
                    style={bgStyles}
                    className={cn(
                        'w-full h-full absolute z-0 inset-0 bg-inherit blur-xl',
                        className,
                    )}
                />
            )}
        </div>
    );
};
