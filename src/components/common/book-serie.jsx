import { cn } from '@/helpers/utils';
import { retry } from '@/helpers/handlers';
import { getSerie } from '@/services/bookworms';

import BooksList from '@/components/common/books-list';

const redundantGetSerie = async serieKey => {
    const [result, error] = await retry(() => getSerie(serieKey), { delay: 1000 });
    return [result, error];
};

export default async function BookSerie({ className, title, serieKey, limit = undefined }) {
    const [serie, error] = await redundantGetSerie(serieKey);

    if (error) {
        return <></>;
    }

    return (
        <div className={cn(className)}>
            <BooksList className='mt-12' title={title} limit={limit} books={serie.books} />
        </div>
    );
}
