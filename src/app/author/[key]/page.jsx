import { redirect, RedirectType } from 'next/navigation';

import { cn } from '@/helpers/utils';
import { keyCase } from '@/helpers/strings';
import { retry } from '@/helpers/handlers';
import { getAuthor } from '@/services/bookworms';

import Header from '@/components/common/header';
import AuthorDetails from '@/components/common/author-details';

const redundantGetAuthor = async authorKey => {
    const [result, error] = await retry(() => getAuthor(authorKey), { delay: 1000 });
    return [result, error];
};

export default async function AuthorPage({ params }) {
    const { key } = await params;
    const authorKey = keyCase(key);

    const [author, error] = await redundantGetAuthor(authorKey);

    if (error) {
        return redirect('/404', RedirectType.replace);
    }

    return (
        <main className={cn('mx-4 mb-12', 'xl:w-[1000px] xl:mx-auto')}>
            <Header />
            <AuthorDetails className='mt-12' author={author} />
        </main>
    );
}
