import { keyCase } from '@/modules/core/helpers/strings';
import { buildQueryParams } from '../helpers/utils';

const baseURL = 'https://endpoints.hckr.mx/bookworms';
const API_KEY = import.meta.env.NEXT_PUBLIC_BOOKWORMS_API_KEY;

const request = async (path, options = {}) => {
    const res = await fetch(`${baseURL}${path}`, {
        ...options,
        headers: {
            'x-dnn-apikey': API_KEY,
            ...options.headers,
        },
    });
    if (!res.ok) throw new Error(res.statusText);
    return res;
};

export const getSettings = () => async () => {
    return (await request(`/settings`)).json();
};

export const getSummaries = () => async () => {
    return (await request(`/summaries`)).json();
};

export const searchEntity =
    ({ entity, query, page = 1, limit = 10 }) =>
    async () => {
        const params = buildQueryParams({ entity, q: query, page, limit });
        return (await request(`/search/${entity}${params}`)).json();
    };

export const getTop =
    (entity, category = 'views', limit = 10) =>
    async () => {
        const params = buildQueryParams({ entity, category, limit });
        return (await request(`/top${params}`)).json();
    };

export const getBook = libid => async () => {
    return (await request(`/book/${libid}`)).json();
};

export const getAuthor = authorName => async () => {
    const authorKey = keyCase(authorName);
    return (await request(`/author/${authorKey}`)).json();
};

export const getSerie = serieName => async () => {
    const serieKey = keyCase(serieName);
    return (await request(`/serie/${serieKey}`)).json();
};

export const getCategory =
    ({ categoryName, page = 1, limit = 10 }) =>
    async () => {
        const categoryKey = keyCase(categoryName);
        const params = buildQueryParams({ page, limit });
        return (await request(`/category/${categoryKey}${params}`)).json();
    };

export const requestBookFile = async (filename, format = 'epub') => {
    await request(`/request?filename=${filename}&format=${format}`);
};

export const validateBookFile = async filename => {
    try {
        const data = await (await request(`/validate?filename=${filename}`)).json();
        return data?.downloadUrl;
    } catch {
        return false;
    }
};

export const downloadBookFile = async filename => {
    return (await request(`/download?filename=${filename}`)).blob();
};

export const sendBookToKindle = async ({ filename, email }) => {
    return (
        await request(`/sendto-kindle`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ filename, email }),
        })
    ).json();
};

export const getFileUrl = async filename => {
    try {
        const data = await (await request(`/file?filename=${filename}`)).json();
        return data?.publicUrl;
    } catch {
        return false;
    }
};
