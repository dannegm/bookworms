import Header from '@/components/common/header';
import { cn } from '@/helpers/utils';

export default async function Home() {
    return (
        <main className={cn('mx-4 mb-12 min-h-screen flex items-center', 'sm:mx-auto sm:w-1/2')}>
            <Header className='flex-1 -mt-32' />
        </main>
    );
}
