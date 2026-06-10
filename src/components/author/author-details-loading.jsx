import { cn, getId } from '@/helpers/utils';
import { sequence } from '@/helpers/arrays';
import { random } from '@/helpers/maths';
import { Skeleton } from '@/ui/skeleton';
import { Divider } from '@/components/layout/primitives';

export const AuthorDetailsLoading = ({ className }) => {
    const rows = sequence(6).map(() => ({ key: getId(), width: random(45, 80) }));

    return (
        <div className={cn('flex flex-col', className)}>
            <div className='flex items-center gap-5 pb-6'>
                <Skeleton className='size-24 rounded-full shrink-0' />
                <div className='min-w-0 flex flex-col gap-2'>
                    <Skeleton className='h-3 w-10' />
                    <Skeleton className='h-8 w-48' />
                    <Skeleton className='h-4 w-32' />
                </div>
            </div>

            <Divider />

            <div className='pt-6 flex flex-col gap-6'>
                <div className='grid grid-cols-2 sm:grid-cols-4 gap-2.5'>
                    {sequence(4).map(i => (
                        <div key={i} className='flex flex-col gap-2'>
                            <Skeleton className='w-full aspect-book rounded-lg' />
                            <Skeleton className='h-3 w-full' />
                            <Skeleton className='h-3 w-3/4' />
                        </div>
                    ))}
                </div>
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-x-6'>
                    {rows.map(row => (
                        <div key={row.key} className='flex items-center gap-3.5 py-3 border-b border-border/60'>
                            <Skeleton className='w-9 aspect-book rounded shrink-0' />
                            <div className='flex-1 space-y-1.5'>
                                <Skeleton className='h-4' style={{ width: `${row.width}%` }} />
                                <Skeleton className='h-3 w-28' />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
