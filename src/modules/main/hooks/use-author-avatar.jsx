import { useQuery } from '@tanstack/react-query';

import { PIXEL } from '@/modules/core/helpers/constants';
import { getAuthorPicture } from '@/modules/core/services/openlibrary';

export const useAuthorAvatar = name => {
    const { data: picture = PIXEL } = useQuery(getAuthorPicture(name));
    return picture;
};
