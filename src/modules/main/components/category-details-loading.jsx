import { cn } from '@/modules/core/helpers/utils';
import { Skeleton } from '@/modules/shadcn/ui/skeleton';
import { BooksListLoading } from '@/modules/main/components/books-list-loading';

export const CategoryDetailsLoading = ({ className }) => {
    return (
        <div className={cn('flex flex-col gap-8', className)}>
            <header className='relative flex flex-row gap-4 items-center justify-between'>
                <div className='absolute ml-2 size-4 rounded-full bg-muted-foreground/30' />
                <Skeleton className='h-10 w-2/5' />
                <Skeleton className='h-10 w-1/5' />
            </header>

            <BooksListLoading />
        </div>
    );
};
