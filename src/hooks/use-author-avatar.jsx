import { useQuery } from '@tanstack/react-query';

import { PIXEL } from '@/helpers/constants';
import { getAuthorPicture } from '@/services/openlibrary';

export const useAuthorAvatar = name => {
    const { data: picture = PIXEL } = useQuery(getAuthorPicture(name));
    return picture;
};
