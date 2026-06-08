import { BookOpenText, Search } from 'lucide-react';
import { cn } from '@/helpers/utils';

import { Section } from '@/components/layout/section';

import { Input } from '@/ui/input';
import { Button } from '@/ui/button';

export const SearchBox = ({ className }) => {
    return (
        <Section className={cn(className)}>
            <form className='flex w-full items-center gap-2' action='/search' method='get'>
                <Input
                    name='q'
                    classNames={{ wrapper: 'flex-1' }}
                    startIcon={<BookOpenText />}
                    placeholder='Buscar por libro, author o serie...'
                />

                <Button type='submit'>
                    <Search /> Buscar
                </Button>
            </form>
        </Section>
    );
};
