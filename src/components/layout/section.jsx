import { cn } from '@/helpers/utils';

export const Section = ({ className, classNames, children }) => {
    return (
        <section
            className={cn(
                'border-b border-border',
                classNames?.wrapper,
            )}
        >
            <div
                className={cn(
                    'w-main mx-auto p-4 border-0 sm:border-x border-dashed border-border',
                    className,
                )}
            >
                {children}
            </div>
        </section>
    );
};
