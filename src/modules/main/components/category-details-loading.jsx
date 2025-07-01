import { cn } from '@/modules/core/helpers/utils';
import { Skeleton } from '@/modules/shadcn/ui/skeleton';
import { BooksListLoading } from '@/modules/main/components/books-list-loading';

export const CategoryDetailsLoading = ({ className }) => {
    return (
        <div className={cn('flex flex-col gap-8', className)}>
            <header className='flex flex-row gap-4 items-center justify-between'>
                <Skeleton className='h-11 w-1/3' />
                <Skeleton className='h-10 w-1/5' />
            </header>

            <BooksListLoading />
        </div>
    );
};
