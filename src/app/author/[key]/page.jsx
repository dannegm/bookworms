import { cn } from '@/helpers/utils';
import { keyCase } from '@/helpers/strings';
import Header from '@/components/common/header';
import AuthorDetails from '@/components/common/author-details';

export default async function AuthorPage({ params }) {
    const { key } = await params;
    const authorKey = keyCase(key);

    return (
        <main className={cn('mx-4 mb-12', 'sm:container sm:mx-auto', 'xl:w-[1000px] xl:mx-auto')}>
            <Header />
            <AuthorDetails className='mt-12' authorKey={authorKey} />
        </main>
    );
}
