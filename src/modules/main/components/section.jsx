import { cn } from '@/modules/core/helpers/utils';

export const Section = ({ className, classNames, children }) => {
    return (
        <section
            className={cn(
                'border-b border-gray-900/10 dark:border-neutral-100/10',
                classNames?.wrapper,
            )}
        >
            <div
                className={cn(
                    'w-main mx-auto p-4 border-0 sm:border-x border-dashed border-gray-900/10 dark:border-neutral-100/10',
                    className,
                )}
            >
                {children}
            </div>
        </section>
    );
};
