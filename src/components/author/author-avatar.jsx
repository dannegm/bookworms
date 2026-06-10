import { cn } from '@/helpers/utils';
import { toAcronym } from '@/helpers/strings';

import { useAuthorAvatar } from '@/hooks/use-author-avatar';
import { Avatar, AvatarFallback, AvatarImage } from '@/ui/avatar';

export const AuthorAvatar = ({ className, name }) => {
    const avatarPicture = useAuthorAvatar(name);
    return (
        <Avatar className={cn('size-12', className)}>
            <AvatarImage src={avatarPicture} />
            <AvatarFallback className='bg-brand/15 text-brand font-noto font-medium text-sm'>
                {toAcronym(name)}
            </AvatarFallback>
        </Avatar>
    );
};
