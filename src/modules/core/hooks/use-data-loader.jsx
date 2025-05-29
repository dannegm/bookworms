import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';

export const useDataLoader = ({
    query,
    tags = [],
    preventRefetch = false,
    retry = 3,
    realtime = false,
    realtimeWindow = 1000,
    onError,
} = {}) => {
    const result = useQuery({
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
        if (!result?.isFetching && result?.error) {
            onError?.(result?.error);
        }
    }, [result?.isFetching, result?.error]);

    return result;
};
