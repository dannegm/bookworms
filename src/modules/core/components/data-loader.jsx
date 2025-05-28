import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';

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
    const { data, error, isLoading, isFetching } = useQuery({
        queryKey: tags,
        queryFn: () => {
            return query();
        },
        retry,
        refetchOnWindowFocus: realtime || !preventRefetch,
        refetchOnReconnect: realtime || !preventRefetch,
        refetchOnMount: realtime || !preventRefetch,
        refetchInterval: !realtime ? !preventRefetch : realtimeWindow,
        refetchIntervalInBackground: !preventRefetch,
    });

    useEffect(() => {
        if (!isFetching && error) {
            onError?.(error);
        }
    }, [isFetching, error]);

    if (isLoading) {
        return loader || <div>Loading...</div>;
    }

    return children({ data, error });
};
