import { cn } from '@/modules/core/helpers/utils';
import { Skeleton } from '@/modules/shadcn/ui/skeleton';
import { BooksListLoading } from '@/modules/main/components/books-list-loading';

export const SerieDetailsLoading = ({ className }) => {
    return (
        <div className={cn('flex flex-col gap-8', className)}>
            <header className='flex flex-col gap-4 items-center'>
                <Skeleton className='h-12 w-1/2' />
                <Skeleton className='h-10 w-1/3' />
            </header>

            <BooksListLoading />
        </div>
    );
};
