import { keyCase } from '@/helpers/strings';
import { buildQueryParams } from '@/helpers/utils';

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

// Unwraps { data } envelope and throws on { error }
const unwrap = async (res) => {
    const body = await res.json();
    if (body.error) throw new Error(body.error);
    return body.data ?? body;
};

// Returns full { data, pagination } for endpoints where callers need pagination info
const paginated = async (res) => {
    const body = await res.json();
    if (body.error) throw new Error(body.error);
    return body;
};

export const getSettings = (options = {}) => ({
    queryKey: ['settings'],
    queryFn: async () => unwrap(await request('/settings')),
    ...options,
});

export const getSummaries = (options = {}) => ({
    queryKey: ['summaries'],
    queryFn: async () => unwrap(await request('/summaries')),
    ...options,
});

export const searchEntity = ({ entity, query, page = 1, limit = 10, ...options }) => ({
    queryKey: ['search', entity, query, page, limit],
    queryFn: async () => {
        const params = buildQueryParams({ entity, q: query, page, limit });
        return paginated(await request(`/search/${entity}${params}`));
    },
    ...options,
});

export const getBook = (libid, options = {}) => ({
    queryKey: ['book', libid],
    queryFn: async () => unwrap(await request(`/book/${libid}`)),
    ...options,
});

export const getAuthor = (authorName, options = {}) => {
    const authorKey = keyCase(authorName);
    return {
        queryKey: ['author', authorKey],
        queryFn: async () => unwrap(await request(`/author/${authorKey}`)),
        ...options,
    };
};

export const getSerie = (serieName, options = {}) => {
    const serieKey = keyCase(serieName ?? '');
    return {
        queryKey: ['serie', serieKey],
        queryFn: async () => unwrap(await request(`/serie/${serieKey}`)),
        ...options,
    };
};

export const getCategory = ({ categoryName, page = 1, limit = 10, ...options }) => {
    const categoryKey = keyCase(categoryName);
    return {
        queryKey: ['category', categoryKey, page, limit],
        queryFn: async () => {
            const params = buildQueryParams({ page, limit });
            return paginated(await request(`/category/${categoryKey}${params}`));
        },
        ...options,
    };
};

export const getSearchSuggestions = (options = {}) => ({
    queryKey: ['search', 'suggestions'],
    queryFn: async () => unwrap(await request('/search/suggestions')),
    ...options,
});

export const getTopics = ({ page = 1, limit = 50, ...options } = {}) => ({
    queryKey: ['topics', page, limit],
    queryFn: async () => {
        const params = buildQueryParams({ page, limit });
        return unwrap(await request(`/topics${params}`));
    },
    ...options,
});

export const getCollections = ({ page = 1, limit = 50, ...options } = {}) => ({
    queryKey: ['collections', page, limit],
    queryFn: async () => {
        const params = buildQueryParams({ page, limit });
        return paginated(await request(`/collections${params}`));
    },
    ...options,
});

export const getCollection = (id, options = {}) => ({
    queryKey: ['collection', id],
    queryFn: async () => unwrap(await request(`/collections/${id}`)),
    ...options,
});

export const getTopic = (id, options = {}) => ({
    queryKey: ['topic', id],
    queryFn: async () => unwrap(await request(`/topics/${id}`)),
    ...options,
});

export const getTopicCollections = (id, options = {}) => ({
    queryKey: ['topic', id, 'collections'],
    queryFn: async () => unwrap(await request(`/topics/${id}/collections`)),
    ...options,
});

export const getLastCollection = (options = {}) => ({
    queryKey: ['collections', 'last'],
    queryFn: async () => unwrap(await request('/collections/last')),
    ...options,
});

export const requestBookFile = async (filename, format = 'epub') => {
    await request(`/request?filename=${filename}&format=${format}`);
};

export const validateBookFile = async filename => {
    try {
        const data = await unwrap(await request(`/validate?filename=${filename}`));
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
        const data = await unwrap(await request(`/file?filename=${filename}`));
        return data?.publicUrl;
    } catch {
        return false;
    }
};
