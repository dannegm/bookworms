import { Skeleton } from '@nextui-org/skeleton';
import { Card, CardBody, CardFooter } from '@nextui-org/card';
import { Divider } from '@nextui-org/divider';

import { cn } from '@/helpers/utils';

export default function BookPreviewLoading({ className }) {
    return (
        <Card
            className={cn(
                'flex flex-col gap-0 px-1 py-2 bg-white overflow-hidden shadow-sm',
                'sm:py-4',
                'md:gap-2 md:py-8',
                className,
            )}
        >
            <CardBody className='overflow-visible flex flex-col items-center'>
                <div className='relative mx-auto'>
                    <Skeleton className='w-[120px] sm:w-[180px] md:w-[200px] rounded-xl'>
                        <div className='w-[120px] h-[180px] sm:w-[180px] sm:h-[270px] md:w-[200px] md:h-[300px]' />
                    </Skeleton>
                </div>

                <Skeleton className='w-4/5 mt-4 rounded-lg'>
                    <div className='h-5' />
                </Skeleton>

                <Skeleton className='w-1/2 mt-1 rounded-lg'>
                    <div className='h-4' />
                </Skeleton>

                <Skeleton className='w-2/3 mt-1 rounded-lg'>
                    <div className='h-4' />
                </Skeleton>
            </CardBody>

            <CardFooter className='flex flex-col gap-2'>
                <Skeleton className='w-full rounded-xl'>
                    <div className='h-11' />
                </Skeleton>
            </CardFooter>
        </Card>
    );
}
