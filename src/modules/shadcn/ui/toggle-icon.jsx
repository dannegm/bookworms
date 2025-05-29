import { cn } from '@/modules/core/helpers/utils';
import { Toggle } from '@/modules/shadcn/ui/toggle';
import { Square } from 'lucide-react';

export const ToggleIcon = ({ className, icons, ...props }) => {
    const onIcon = icons?.on || <Square fill='currentColor' />;
    const offIcon = icons?.off || <Square />;

    return (
        <Toggle
            className={cn(
                'group bg-neutral-100 hover:bg-neutral-200 hover:text-neutral-900 dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:hover:text-white',
                className,
            )}
            {...props}
        >
            <div className='shrink-0 scale-0 opacity-0 transition-all group-aria-pressed:scale-100 group-aria-pressed:opacity-100'>
                {onIcon}
            </div>
            <div className='absolute shrink-0 scale-100 opacity-100 transition-all group-aria-pressed:scale-0 group-aria-pressed:opacity-0'>
                {offIcon}
            </div>
        </Toggle>
    );
};
