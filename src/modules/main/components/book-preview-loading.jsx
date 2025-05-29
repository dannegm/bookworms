import { cn } from '@/modules/core/helpers/utils';
import { Skeleton } from '@/modules/shadcn/ui/skeleton';

export const BookPreviewLoading = ({ className }) => {
    return (
        <div className={cn('flex flex-col items-center', className)}>
            <Skeleton className='w-8/10 aspect-book rounded-lg' />
            <Skeleton className='h-6 w-full mt-4 rounded-lg' />
            <Skeleton className='h-4 w-4/6 mt-2 rounded-lg' />
        </div>
    );
};
