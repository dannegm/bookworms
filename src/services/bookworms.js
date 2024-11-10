import axios from 'axios';
import { keyCase } from '@/helpers/strings';

const baseURL = 'https://endpoints.hckr.mx/bookworms/';
const API_KEY = process.env.NEXT_PUBLIC_BOOKWORMS_API_KEY;

const bookwormsApi = axios.create({
    baseURL,
    headers: {
        'x-dnn-apikey': API_KEY,
    },
});

export const getSummaries = async () => {
    const { data } = await bookwormsApi.get(`/summaries`);
    return data;
};

export const search = async ({ query, page = 1, limit = 20 }) => {
    const urlParams = new URLSearchParams();

    urlParams.append('q', query);
    urlParams.append('page', page);
    urlParams.append('limit', limit);

    console.log(`/search?${urlParams.toString()}`);

    const { data } = await bookwormsApi.get(`/search?${urlParams.toString()}`);
    return data;
};

export const getTop = async (entity = 'books', category = 'views', limit = 10) => {
    const urlParams = new URLSearchParams();

    urlParams.append('entity', entity);
    urlParams.append('category', category);
    urlParams.append('limit', limit);

    const { data } = await bookwormsApi.get(`/top?${urlParams.toString()}`);
    return data;
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
