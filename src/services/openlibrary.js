import axios from 'axios';
import { PIXEL } from '@/helpers/constants';

const baseURL = 'https://openlibrary.org';
const coversURL = 'https://covers.openlibrary.org';

const openlibraryApi = axios.create({ baseURL });

export const getAuthorPicture = async name => {
    const authorName = encodeURI(name);
    const { data } = await openlibraryApi.get(`/search/authors.json?q=${authorName}`);
    const authorId = data?.docs[0]?.key;

    if (authorId) {
        return `${coversURL}/a/olid/${authorId}-L.jpg`;
    }

    return PIXEL;
};
