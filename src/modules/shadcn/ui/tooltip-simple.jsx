import {
    Tooltip as TooltipPrimitive,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/modules/shadcn/ui/tooltip';

export const Tooltip = ({ content, side = 'bottom', align = 'center', children }) => {
    return (
        <TooltipProvider>
            <TooltipPrimitive>
                <TooltipTrigger asChild>{children}</TooltipTrigger>
                <TooltipContent side={side} align={align}>
                    {content}
                </TooltipContent>
            </TooltipPrimitive>
        </TooltipProvider>
    );
};
