import {
    Tooltip as TooltipPrimitive,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/ui/tooltip';

export const Tooltip = ({ content, side = 'top', align = 'center', delay = 3000, children }) => {
    return (
        <TooltipProvider delayDuration={delay}>
            <TooltipPrimitive>
                <TooltipTrigger asChild>{children}</TooltipTrigger>
                <TooltipContent side={side} align={align}>
                    {content}
                </TooltipContent>
            </TooltipPrimitive>
        </TooltipProvider>
    );
};
