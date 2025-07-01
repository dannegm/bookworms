import * as React from 'react';
import * as ProgressPrimitive from '@radix-ui/react-progress';

import { cn } from '@/modules/core/helpers/utils';
import { getPercent } from '@/modules/core/helpers/maths';

function Progress({ className, value, max = 100, ...props }) {
    return (
        <ProgressPrimitive.Root
            data-slot='progress'
            className={cn(
                'bg-primary/20 relative h-2 w-full overflow-hidden rounded-full',
                className,
            )}
            {...props}
        >
            <ProgressPrimitive.Indicator
                data-slot='progress-indicator'
                className='bg-primary h-full w-full flex-1 transition-all'
                style={{ transform: `translateX(-${100 - getPercent(value, max)}%)` }}
            />
        </ProgressPrimitive.Root>
    );
}

export { Progress };
