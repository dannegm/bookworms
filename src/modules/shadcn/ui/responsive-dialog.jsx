import { cn } from '@/modules/core/helpers/utils';

import { useBreakpoint } from '@/modules/core/hooks/use-breakpoint';
import { Drawer, DrawerContent } from '@/modules/shadcn/ui/drawer';
import { Dialog, DialogTitle, DialogContent } from '@/modules/shadcn/ui/dialog';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';

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

export const ResponsiveDialogContent = ({
    title,
    className,
    breakpoint = 'xs',
    children,
    showCloseButton,
    ...props
}) => {
    const currentBreakpoint = useBreakpoint('xs');

    if (currentBreakpoint === breakpoint) {
        return (
            <DrawerContent className={cn('!h-full !max-h-[calc(100%)]', className)} {...props}>
                {children}
            </DrawerContent>
        );
    }

    return (
        <DialogContent
            className={cn(className)}
            showCloseButton={showCloseButton}
            onOpenAutoFocus={ev => ev.preventDefault()}
            {...props}
        >
            <VisuallyHidden>
                <DialogTitle>{title}</DialogTitle>
            </VisuallyHidden>
            {children}
        </DialogContent>
    );
};
