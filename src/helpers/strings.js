import { trim, lowerCase, deburr, kebabCase } from 'lodash';
import { pipe } from './utils';

const toString = str => str.toString();
export const keyCase = pipe([toString, trim, lowerCase, deburr, kebabCase]);

export const formatBytes = (bytes, decimals = 2) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};
