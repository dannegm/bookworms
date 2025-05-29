import { useEffect } from 'react';
import { useDataLoader } from '@/modules/core/hooks/use-data-loader';

export const DataLoader = ({
    query,
    tags = [],
    loader = null,
    preventRefetch = false,
    retry = 3,
    realtime = false,
    realtimeWindow = 1000,
    onError,
    children = () => null,
} = {}) => {
    const { data, error, isLoading, isFetching } = useDataLoader({
        query,
        tags,
        preventRefetch,
        retry,
        realtime,
        realtimeWindow,
        onError,
    });

    useEffect(() => {
        if (!isFetching && error) {
            onError?.(error);
        }
    }, [isFetching, error]);

    if (isLoading || isFetching) {
        return loader || <div>Loading...</div>;
    }

    return children({ data, error });
};
