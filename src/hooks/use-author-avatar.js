import { useEffect, useState } from 'react';
import { AVATAR_PLACEHOLDER, PIXEL } from '@/helpers/constants';
import { checkPixel } from '@/helpers/image';
import { getAuthorPicture } from '@/services/openlibrary';
import { keyCase } from '@/helpers/strings';

const useAuthorAvatar = name => {
    const [picture, setPicture] = useState(PIXEL);

    useEffect(() => {
        const requestImage = async () => {
            const requestedImage = await getAuthorPicture(name);
            const isPixel = await checkPixel(requestedImage);

            if (!isPixel) {
                setPicture(requestedImage);
            } else {
                setPicture(`${AVATAR_PLACEHOLDER}?username=${keyCase(name)}`);
            }
        };
        requestImage();
    }, []);

    return picture;
};

export default useAuthorAvatar;
