import { cn, getId } from '@/helpers/utils';
import { sequence } from '@/helpers/arrays';
import { Skeleton } from '@/ui/skeleton';
import { Divider } from '@/components/layout/primitives';

export const BookDetailsLoading = ({ className }) => (
    <div className={cn('flex flex-col sm:flex-row gap-8 items-start', className)}>

        {/* Left: cover + buttons */}
        <div className='flex flex-col gap-3 items-center sm:items-stretch w-full sm:w-56 shrink-0'>
            <Skeleton className='w-56 aspect-book rounded-lg mx-auto sm:mx-0' />
            <Skeleton className='h-9 w-full' />
            <Skeleton className='h-9 w-full hidden sm:block' />
            <Skeleton className='h-9 w-full hidden sm:block' />
        </div>

        {/* Right: info */}
        <div className='flex flex-col gap-4 flex-1 min-w-0'>
            <Skeleton className='h-6 w-40 rounded-full' />
            <Skeleton className='h-9 w-4/5' />
            <Skeleton className='h-14 w-full rounded-xl' />

            <div className='flex items-center gap-2'>
                <Skeleton className='h-3.5 w-24' />
                <Skeleton className='h-3.5 w-3' />
                <Skeleton className='h-3.5 w-16' />
                <Skeleton className='h-3.5 w-3' />
                <Skeleton className='h-3.5 w-20' />
            </div>

            <Divider />

            <div className='flex flex-col gap-2'>
                {sequence(5).map(i => (
                    <Skeleton key={i} className='h-4' style={{ width: `${85 - i * 8}%` }} />
                ))}
            </div>

            <div className='flex gap-1.5 flex-wrap'>
                {[52, 68, 44, 76, 56].map(w => (
                    <Skeleton key={getId()} className='h-6 rounded-full' style={{ width: `${w}px` }} />
                ))}
            </div>
        </div>
    </div>
);
