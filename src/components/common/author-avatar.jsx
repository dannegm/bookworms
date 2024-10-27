'use client';
import Image from 'next/image';
import { cn } from '@/helpers/utils';
import useAuthorAvatar from '@/hooks/use-author-avatar';

export default function AuthorAvatar({ className, name }) {
    const avatarPicture = useAuthorAvatar(name);

    return (
        <Image
            className={cn(
                'inline-block rounded-full drop-shadow-xl bg-slate-400 object-cover object-center',
                className,
            )}
            src={avatarPicture}
            width={200}
            height={200}
            alt={`Una foto de ${name}`}
        />
    );
}
