import { keyCase } from '@/helpers/strings';
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

export const getSettings = (options = {}) => ({
    queryKey: ['settings'],
    queryFn: async () => (await request('/settings')).json(),
    ...options,
});

export const getSummaries = (options = {}) => ({
    queryKey: ['summaries'],
    queryFn: async () => (await request('/summaries')).json(),
    ...options,
});

export const searchEntity = ({ entity, query, page = 1, limit = 10, ...options }) => ({
    queryKey: ['search', entity, query, page, limit],
    queryFn: async () => {
        const params = buildQueryParams({ entity, q: query, page, limit });
        return (await request(`/search/${entity}${params}`)).json();
    },
    ...options,
});

export const getTop = (entity, category = 'views', limit = 10, options = {}) => ({
    queryKey: ['top', entity, category, limit],
    queryFn: async () => {
        const params = buildQueryParams({ entity, category, limit });
        return (await request(`/top${params}`)).json();
    },
    ...options,
});

export const getBook = (libid, options = {}) => ({
    queryKey: ['book', libid],
    queryFn: async () => (await request(`/book/${libid}`)).json(),
    ...options,
});

export const getAuthor = (authorName, options = {}) => {
    const authorKey = keyCase(authorName);
    return {
        queryKey: ['author', authorKey],
        queryFn: async () => (await request(`/author/${authorKey}`)).json(),
        ...options,
    };
};

export const getSerie = (serieName, options = {}) => {
    const serieKey = keyCase(serieName ?? '');
    return {
        queryKey: ['serie', serieKey],
        queryFn: async () => (await request(`/serie/${serieKey}`)).json(),
        ...options,
    };
};

export const getCategory = ({ categoryName, page = 1, limit = 10, ...options }) => {
    const categoryKey = keyCase(categoryName);
    return {
        queryKey: ['category', categoryKey, page, limit],
        queryFn: async () => {
            const params = buildQueryParams({ page, limit });
            return (await request(`/category/${categoryKey}${params}`)).json();
        },
        ...options,
    };
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
    return (await request(`/sendto-kindle`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ filename, email }),
    })).json();
};

export const getFileUrl = async filename => {
    try {
        const data = await (await request(`/file?filename=${filename}`)).json();
        return data?.publicUrl;
    } catch {
        return false;
    }
};
