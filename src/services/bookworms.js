import axios from 'axios';
import { keyCase } from '@/helpers/strings';

const baseURL = 'https://endpoints.hckr.mx/bookworms/';

const bookwormsApi = axios.create({ baseURL });

export const getTop = async (entity = 'books', category = 'views', limit = 10) => {
    const urlParams = new URLSearchParams();

    urlParams.append('entity', entity);
    urlParams.append('category', category);
    urlParams.append('limit', limit);

    const { data } = await bookwormsApi.get(`/top?${urlParams.toString()}`);
    return data;
};

export const search = async query => {
    const urlParams = new URLSearchParams();

    urlParams.append('q', query);

    try {
        const { data } = await bookwormsApi.get(`/search?${urlParams.toString()}`);
        return { data, error: null };
    } catch (error) {
        return { data: null, error };
    }
};

export const getBook = async libid => {
    const { data } = await bookwormsApi.get(`/book/${libid}`);
    return data;
};

export const getAuthor = async authorName => {
    const authorKey = keyCase(authorName);
    const { data } = await bookwormsApi.get(`/author/${authorKey}`);
    return data;
};

export const getSerie = async serieName => {
    const serieKey = keyCase(serieName);
    const { data } = await bookwormsApi.get(`/serie/${serieKey}`);
    return data;
};

export const requestBookFile = async filename => {
    await bookwormsApi.get(`request?filename=${filename}`);
};

export const validateBookFile = async filename => {
    try {
        const { data } = await bookwormsApi.get(`validate?filename=${filename}`);

        return data?.downloadUrl;
    } catch (err) {
        return false;
    }
};

export const downloadBookFile = async filename => {
    const { data } = await bookwormsApi.get(`download?filename=${filename}`, {
        responseType: 'blob',
    });
    const blob = new Blob([data], { type: 'application/epub+zip' });
    return blob;
};
