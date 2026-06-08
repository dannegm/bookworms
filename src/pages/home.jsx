import { BookOpenText, Search } from 'lucide-react';

import { Input } from '@/ui/input';
import { Button } from '@/ui/button';

import { Layout } from '@/components/layout/layout';
import { Section } from '@/components/layout/section';
import { Logo } from '@/components/layout/logo';
import { Summaries } from '@/components/layout/summaries';
import { Faqs } from '@/components/layout/faqs';
import { TopBooks } from '@/components/layout/top-books';

export const Home = () => {
    return (
        <Layout hideLogo>
            <Section className='flex flex-col pt-32'>
                <form className='flex flex-col gap-4' action='/search' method='get'>
                    <Logo className='text-4xl' />
                    <Input
                        name='q'
                        className='md:text-xl py-6 pl-12'
                        classNames={{
                            startIcon: '[&_svg]:size-6 ml-2',
                        }}
                        startIcon={<BookOpenText />}
                        placeholder='Buscar por libro, author o serie...'
                    />

                    <div className='flex items-center'>
                        <Summaries />

                        <div className='flex-1' />

                        <Button type='submit'>
                            <Search /> Buscar
                        </Button>
                    </div>
                </form>
            </Section>

            <Section>
                <TopBooks title='Libros más buscados' category='views' />
            </Section>

            <Section>
                <Faqs />
            </Section>
        </Layout>
    );
};
