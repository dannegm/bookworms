import { redirect, RedirectType } from 'next/navigation';

import { cn } from '@/helpers/utils';
import { retry } from '@/helpers/handlers';
import { getBook } from '@/services/bookworms';

import Header from '@/components/common/header';
import BookDetails from '@/components/common/book-details';

const redundantGetBook = async libid => {
    const [result, error] = await retry(() => getBook(libid), { delay: 1000 });
    return [result, error];
};

export default async function BookPage({ params }) {
    const { libid } = await params;

    const [book, error] = await redundantGetBook(libid);

    if (error) {
        return redirect('/404', RedirectType.replace);
    }

    return (
        <main className={cn('mx-4 mb-12', 'xl:w-[1000px] xl:mx-auto')}>
            <Header />
            <BookDetails className='mt-12' book={book} />
        </main>
    );
}
