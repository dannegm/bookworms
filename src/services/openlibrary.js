import { keyCase } from '@/helpers/strings';
import { checkPixel } from '@/helpers/image';
import { AVATAR_PLACEHOLDER } from '@/helpers/constants';

const baseURL = 'https://openlibrary.org';
const coversURL = 'https://covers.openlibrary.org';

export const getAuthorPicture = (name, options = {}) => ({
    queryKey: ['author-picture', name],
    queryFn: async () => {
        const res = await fetch(`${baseURL}/search/authors.json?q=${encodeURI(name)}`);
        if (!res.ok) return `${AVATAR_PLACEHOLDER}?username=${keyCase(name)}`;

        const data = await res.json();
        const authorId = data?.docs[0]?.key;
        if (!authorId) return `${AVATAR_PLACEHOLDER}?username=${keyCase(name)}`;

        const imageUrl = `${coversURL}/a/olid/${authorId}-L.jpg`;
        const isPixel = await checkPixel(imageUrl);
        return isPixel ? `${AVATAR_PLACEHOLDER}?username=${keyCase(name)}` : imageUrl;
    },
    ...options,
});
