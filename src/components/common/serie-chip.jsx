import { Button } from '@nextui-org/button';
import { cn } from '@/helpers/utils';
import { keyCase } from '@/helpers/strings';
import BooksRegular from '../icons/books-regular';

export default function SerieChip({ className, serie }) {
    return (
        <Button
            as='a'
            href={`/serie/${keyCase(serie)}`}
            className={cn(className)}
            radius='full'
            size='sm'
            startContent={<BooksRegular />}
        >
            {serie}
        </Button>
    );
}
