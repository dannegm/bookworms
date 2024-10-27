import { twMerge } from 'tailwind-merge';
import { clsx } from 'clsx';

export const cn = (...inputs) => {
    return twMerge(clsx(inputs));
};

export const pipe = fns => value => fns.reduce((acc, fn) => fn(acc), value);

export const downloadBlob = (blob, filename = 'file.blob') => {
    const urlBlob = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = urlBlob;
    link.download = filename;

    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    URL.revokeObjectURL(urlBlob);
};
