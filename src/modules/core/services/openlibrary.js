import { PIXEL } from '@/modules/core/helpers/constants';

const baseURL = 'https://openlibrary.org';
const coversURL = 'https://covers.openlibrary.org';

export const getAuthorPicture = name => async () => {
    const authorName = encodeURI(name);
    const res = await fetch(`${baseURL}/search/authors.json?q=${authorName}`);
    if (!res.ok) return PIXEL;
    const data = await res.json();
    const authorId = data?.docs[0]?.key;
    return authorId ? `${coversURL}/a/olid/${authorId}-L.jpg` : PIXEL;
};
