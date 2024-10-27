import Header from '@/components/common/header';
import TopBooks from '@/components/common/top-books';

export default async function Home() {
    return (
        <main className='container mx-auto'>
            <Header />
            <TopBooks className='mt-8' />
        </main>
    );
}
