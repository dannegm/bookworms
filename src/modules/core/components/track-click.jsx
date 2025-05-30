import { isValidElement } from 'react';
import { cn } from '@/modules/core/helpers/utils';

import { umami } from '@/modules/core/services/umami';

export const TrackClick = ({ className, name = 'click', data = {}, children, ...props }) => {
    if (!isValidElement(children)) return children;

    const handleClick = () => {
        umami.track({
            name,
            data,
            url: window.location.href,
        });
    };

    return (
        <div className={cn(className)} onClick={handleClick} {...props}>
            {children}
        </div>
    );
};
