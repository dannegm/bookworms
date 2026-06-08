import { cn } from '@/helpers/utils';
import { toAcronym } from '@/helpers/strings';

import { useAuthorAvatar } from '@/hooks/use-author-avatar';
import { Avatar, AvatarFallback, AvatarImage } from '@/ui/avatar';

export const AuthorAvatar = ({ className, name }) => {
    const avatarPicture = useAuthorAvatar(name);
    return (
        <Avatar className={cn('size-12', className)}>
            <AvatarImage src={avatarPicture} />
            <AvatarFallback className='bg-gray-500 text-white'>{toAcronym(name)}</AvatarFallback>
        </Avatar>
    );
};
