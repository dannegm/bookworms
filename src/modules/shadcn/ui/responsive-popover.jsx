import { cn } from '@/modules/core/helpers/utils';
import { useBreakpoint } from '@/modules/core/hooks/use-breakpoint';
import { Drawer, DrawerContent, DrawerTrigger } from './drawer';
import { Popover, PopoverContent, PopoverTrigger } from '@radix-ui/react-popover';

export const ResponsivePopover = ({
    classNames,
    breakpoint = 'xs',
    trigger,
    children,
    props,
    ...$props
}) => {
    const currentBreakpoint = useBreakpoint('xs');

    if (currentBreakpoint === breakpoint) {
        return (
            <Drawer {...$props}>
                <DrawerTrigger className={cn(classNames?.trigger)} {...props?.trigger} asChild>
                    {trigger}
                </DrawerTrigger>
                <DrawerContent className={cn('w-full px-8 py-16', classNames?.content)} {...props?.content}>
                    {children}
                </DrawerContent>
            </Drawer>
        );
    }

    return (
        <Popover {...$props}>
            <PopoverTrigger className={cn(classNames?.trigger)} {...props?.trigger} asChild>
                {trigger}
            </PopoverTrigger>
            <PopoverContent className={cn(classNames?.content)} {...props?.content}>
                {children}
            </PopoverContent>
        </Popover>
    );
};
