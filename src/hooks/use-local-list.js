import { useCallback } from 'react';
import { useLocalStorage } from '@/hooks/use-local-storage';

export const useLocalList = (key, idKey = 'libid') => {
    const [list, setList] = useLocalStorage(key, []);

    const has = useCallback(
        id => list.some(item => item[idKey] === id),
        [list, idKey],
    );

    const add = useCallback(
        item => {
            setList(prev => {
                if (prev.some(i => i[idKey] === item[idKey])) return prev;
                return [item, ...prev];
            });
        },
        [setList, idKey],
    );

    const remove = useCallback(
        id => setList(prev => prev.filter(item => item[idKey] !== id)),
        [setList, idKey],
    );

    const toggle = useCallback(
        item => {
            setList(prev => {
                const exists = prev.some(i => i[idKey] === item[idKey]);
                return exists
                    ? prev.filter(i => i[idKey] !== item[idKey])
                    : [item, ...prev];
            });
        },
        [setList, idKey],
    );

    const upsert = useCallback(
        item => {
            setList(prev => [item, ...prev.filter(i => i[idKey] !== item[idKey])]);
        },
        [setList, idKey],
    );

    const clear = useCallback(
        () => setList([]),
        [setList],
    );

    return [list, { add, remove, toggle, upsert, clear, has }];
};

export const useFavorites = () => useLocalList('library:favorites');

export const useDownloads = () => useLocalList('library:downloads');

export const useReadingHistory = () => useLocalList('library:reading');
