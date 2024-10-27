import { Button } from '@nextui-org/button';
import { cn } from '@/helpers/utils';
import { keyCase } from '@/helpers/strings';
import UserRegular from '@/components/icons/user-regular';

export default function AuthorChip({ className, author }) {
    return (
        <Button
            as='a'
            href={`/author/${keyCase(author.name)}`}
            className={cn(className)}
            radius='full'
            size='sm'
            startContent={<UserRegular />}
        >
            {author.name}
        </Button>
    );
}
