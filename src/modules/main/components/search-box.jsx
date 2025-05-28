import { BookOpenText, Search } from 'lucide-react';
import { cn } from '@/modules/core/helpers/utils';

import { Section } from '@/modules/main/components/section';

import { Input } from '@/modules/shadcn/ui/input';
import { Button } from '@/modules/shadcn/ui/button';

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
