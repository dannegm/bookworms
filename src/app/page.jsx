import Header from '@/components/common/header';
import { cn } from '@/helpers/utils';

export default async function Home() {
    return (
        <main
            className={cn('mx-4 mb-12 min-h-screen flex items-center', 'xl:w-[1000px] xl:mx-auto')}
        >
            <Header className='flex-1 -mt-32' />
        </main>
    );
}
