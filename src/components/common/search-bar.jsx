import Form from 'next/form';
import { cn } from '@/helpers/utils';

import { Input } from '@nextui-org/input';
import { Button } from '@nextui-org/button';

import BookOpenRegular from '@/components/icons/book-open-regular';
import SearchRegular from '@/components/icons/search-regular';

export default function SearchBar({ className }) {
    return (
        <Form className={cn('relative z-20 flex flex-row gap-2', className)} action='/search'>
            <Input
                radius='sm'
                size='lg'
                variant='bordered'
                placeholder='Type to search...'
                name='query'
                className='bg-white'
                startContent={
                    <div>
                        <BookOpenRegular className='text-black/50 pointer-events-none' />
                    </div>
                }
            />
            <Button
                className='hidden sm:flex bg-black text-white'
                radius='sm'
                size='lg'
                type='submit'
                endContent={
                    <div>
                        <SearchRegular />
                    </div>
                }
            >
                Buscar
            </Button>
            <Button
                className='flex sm:hidden bg-black text-white'
                radius='sm'
                size='lg'
                type='submit'
                isIconOnly
            >
                <SearchRegular />
            </Button>
        </Form>
    );
}
