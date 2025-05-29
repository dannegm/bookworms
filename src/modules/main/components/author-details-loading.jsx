import { cn } from '@/modules/core/helpers/utils';
import { Skeleton } from '@/modules/shadcn/ui/skeleton';
import { BooksListLoading } from '@/modules/main/components/books-list-loading';

export const AuthorDetailsLoading = ({ className }) => {
    return (
        <div className={cn('flex flex-col gap-8', className)}>
            <header className='flex flex-col gap-4 items-center'>
                <Skeleton className='size-32 rounded-full' />
                <Skeleton className='h-8 w-1/2' />
                <Skeleton className='h-10 w-1/3' />
            </header>

            <BooksListLoading />
        </div>
    );
};
