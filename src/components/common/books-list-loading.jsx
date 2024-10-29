import { Skeleton } from '@nextui-org/skeleton';

import { cn } from '@/helpers/utils';
import { sequence } from '@/helpers/arrays';
import BookPreviewLoading from './book-preview-loading';

export default function BooksListLoading({ className }) {
    return (
        <div className={cn(className)}>
            <Skeleton className='w-3/12 rounded-lg mb-4'>
                <div className='h-5' />
            </Skeleton>

            <div
                className={cn(
                    'grid grid-cols-2 justify-between gap-4',
                    'md:grid-cols-3',
                    'lg:gap-8',
                )}
            >
                {sequence(6).map(index => (
                    <BookPreviewLoading key={`book-loading-${index}`} />
                ))}
            </div>
        </div>
    );
}
