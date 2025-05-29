import { useEffect, useState } from 'react';
import { checkPixel } from '@/modules/core/helpers/image';
import { keyCase } from '@/modules/core/helpers/strings';
import { AVATAR_PLACEHOLDER, PIXEL } from '@/modules/core/helpers/constants';
import { getAuthorPicture } from '@/modules/core/services/openlibrary';

export const useAuthorAvatar = name => {
    const [picture, setPicture] = useState(PIXEL);

    useEffect(() => {
        const requestImage = async () => {
            const request = getAuthorPicture(name);
            const requestedImage = await request();
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
