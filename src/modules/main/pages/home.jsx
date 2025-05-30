import { BookOpenText, Search } from 'lucide-react';

import { Input } from '@/modules/shadcn/ui/input';
import { Button } from '@/modules/shadcn/ui/button';

import { Layout } from '@/modules/main/components/layout';
import { Section } from '@/modules/main/components/section';
import { Logo } from '@/modules/main/components/logo';
import { Summaries } from '@/modules/main/components/summaries';

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
        </Layout>
    );
};
