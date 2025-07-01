import axios from 'axios';
import { keyCase } from '@/modules/core/helpers/strings';
import { buildQueryParams } from '../helpers/utils';

const baseURL = 'https://endpoints.hckr.mx/bookworms';
const API_KEY = import.meta.env.NEXT_PUBLIC_BOOKWORMS_API_KEY;

const bookwormsApi = axios.create({
    baseURL,
    headers: {
        'x-dnn-apikey': API_KEY,
    },
});

export const getSettings = () => async () => {
    const { data } = await bookwormsApi.get(`/settings`);
    return data;
};

export const getSummaries = () => async () => {
    const { data } = await bookwormsApi.get(`/summaries`);
    return data;
};

export const searchEntity =
    ({ entity, query, page = 1, limit = 10 }) =>
    async () => {
        const params = buildQueryParams({ entity, q: query, page, limit });
        const { data } = await bookwormsApi.get(`/search/${entity}${params}`);
        return data;
    };

export const getTop =
    (entity, category = 'views', limit = 10) =>
    async () => {
        const params = buildQueryParams({ entity, category, limit });
        const { data } = await bookwormsApi.get(`/top${params}`);
        return data;
    };

export const getBook = libid => async () => {
    const { data } = await bookwormsApi.get(`/book/${libid}`);
    return data;
};

export const getAuthor = authorName => async () => {
    const authorKey = keyCase(authorName);
    const { data } = await bookwormsApi.get(`/author/${authorKey}`);
    return data;
};

export const getSerie = serieName => async () => {
    const serieKey = keyCase(serieName);
    const { data } = await bookwormsApi.get(`/serie/${serieKey}`);
    return data;
};

export const getCategory =
    ({ categoryName, page = 1, limit = 10 }) =>
    async () => {
        const categoryKey = keyCase(categoryName);
        const params = buildQueryParams({ page, limit });
        const { data } = await bookwormsApi.get(`/category/${categoryKey}${params}`);
        return data;
    };

export const requestBookFile = async (filename, format = 'epub') => {
    await bookwormsApi.get(`/request?filename=${filename}&format=${format}`);
};

export const validateBookFile = async filename => {
    try {
        const { data } = await bookwormsApi.get(`/validate?filename=${filename}`);
        return data?.downloadUrl;
    } catch (err) {
        return false;
    }
};

export const downloadBookFile = async filename => {
    const { data } = await bookwormsApi.get(`/download?filename=${filename}`, {
        responseType: 'blob',
    });
    const blob = new Blob([data], { type: 'application/epub+zip' });
    return blob;
};

export const sendBookToKindle = async ({ filename, email }) => {
    const { data } = await bookwormsApi.post(`/sendto-kindle`, {
        filename,
        email,
    });
    return data;
};

export const getFileUrl = async filename => {
    try {
        const { data } = await bookwormsApi.get(`/file?filename=${filename}`);
        return data?.publicUrl;
    } catch (err) {
        return false;
    }
};
