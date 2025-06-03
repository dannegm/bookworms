import { cn } from '@/modules/core/helpers/utils';

import { useBreakpoint } from '@/modules/core/hooks/use-breakpoint';
import { Drawer, DrawerContent } from '@/modules/shadcn/ui/drawer';
import { Dialog, DialogContent } from '@/modules/shadcn/ui/dialog';

export const ResponsiveDialog = ({ className, breakpoint = 'xs', children, ...props }) => {
    const currentBreakpoint = useBreakpoint('xs');

    if (currentBreakpoint === breakpoint) {
        return (
            <Drawer className={cn(className)} {...props}>
                {children}
            </Drawer>
        );
    }

    return (
        <Dialog className={cn(className)} {...props}>
            {children}
        </Dialog>
    );
};

export const ResponsiveDialogContent = ({ className, breakpoint = 'xs', children, ...props }) => {
    const currentBreakpoint = useBreakpoint('xs');

    if (currentBreakpoint === breakpoint) {
        return (
            <DrawerContent className={cn(className)} {...props}>
                {children}
            </DrawerContent>
        );
    }

    return (
        <DialogContent className={cn(className)} {...props}>
            {children}
        </DialogContent>
    );
};
