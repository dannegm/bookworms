import { useQueryState } from 'nuqs';

const useDebug = () => {
    const [debug] = useQueryState('debug');
    return debug !== null;
};

export default useDebug;
