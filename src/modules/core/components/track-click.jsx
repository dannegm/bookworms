import { cloneElement, isValidElement } from 'react';

import { umami } from '@/modules/core/services/umami';

export const TrackClick = ({ name = 'click', data = {}, children }) => {
    if (!isValidElement(children)) return children;

    const handleClick = () => {
        umami.track({
            name,
            data,
            url: window.location.href,
        });
    };

    return <div onClick={handleClick}>{children}</div>;
};
