'use client';
import Form from 'next/form';
import { useSearchParams } from 'next/navigation';
import { cn } from '@/helpers/utils';

import { Input } from '@nextui-org/input';
import { Button } from '@nextui-org/button';

import BookOpenRegular from '@/components/icons/book-open-regular';
import SearchRegular from '@/components/icons/search-regular';
import useInput from '@/hooks/use-input';

export default function SearchBar({ className }) {
    const searchParams = useSearchParams();
    const query = searchParams.get('query');
    const [queryValue, handleChangeQueryValue] = useInput(query || '');

    return (
        <Form className={cn('relative z-20 flex flex-row gap-2', className)} action='/search'>
            <Input
                className='bg-white'
                radius='sm'
                name='query'
                value={queryValue}
                placeholder='Buscar por libro, autor o serie...'
                onChange={handleChangeQueryValue}
                size='lg'
                variant='bordered'
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
