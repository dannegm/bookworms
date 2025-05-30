import { umami } from '@/modules/core/services/umami';
import { useDelayedEffect } from '../hooks/use-delayed-effect';

export const TrackersProvider = ({ children }) => {
    useDelayedEffect(
        () => {
            umami.track({
                url: window.location.href,
                referrer: document.referrer,
                screen: `${window.screen.width}x${window.screen.height}`,
                title: document.title,
            });
        },
        [],
        3 * 1000,
    );
    return <>{children}</>;
};
