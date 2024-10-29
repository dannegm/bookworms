import { useState } from 'react';
import { onChange } from '@/helpers/handlers';

const useInput = (initialValue = '') => {
    const [value, setValue] = useState(initialValue);

    const clear = () => {
        setValue('');
    };

    return [value, onChange(setValue), clear];
};

export default useInput;
