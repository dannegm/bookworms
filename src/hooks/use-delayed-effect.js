import { useEffect } from 'react';

const useDelayedEffect = (effect, deps, delay = 300) => {
    useEffect(() => {
        const handler = setTimeout(() => {
            effect();
        }, delay);

        return () => clearTimeout(handler);
    }, [effect, delay, ...deps]);
};

export default useDelayedEffect;
