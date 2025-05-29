import { cn } from '@/modules/core/helpers/utils';
import { toAcronym } from '@/modules/core/helpers/strings';

import { useAuthorAvatar } from '@/modules/main/hooks/use-author-avatar';
import { Avatar, AvatarFallback, AvatarImage } from '@/modules/shadcn/ui/avatar';

export const AuthorAvatar = ({ className, name }) => {
    const avatarPicture = useAuthorAvatar(name);
    return (
        <Avatar className={cn('size-12', className)}>
            <AvatarImage src={avatarPicture} />
            <AvatarFallback className='bg-gray-500 text-white'>{toAcronym(name)}</AvatarFallback>
        </Avatar>
    );
};
