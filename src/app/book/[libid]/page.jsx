import Header from '@/components/common/header';
import BookDetails from '@/components/common/book-details';
import { cn } from '@/helpers/utils';

export default async function BookPage({ params }) {
    const { libid } = await params;
    return (
        <main className={cn('mx-4 mb-12', 'xl:w-[1000px] xl:mx-auto')}>
            <Header />
            <BookDetails className='mt-12' libid={libid} />
        </main>
    );
}
