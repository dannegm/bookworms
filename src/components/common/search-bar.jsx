'use client';
import { useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { Input } from '@nextui-org/input';
import { Button } from '@nextui-org/button';

import { cn } from '@/helpers/utils';
import useInput from '@/hooks/use-input';

import BookOpenRegular from '@/components/icons/book-open-regular';
import SearchRegular from '@/components/icons/search-regular';

export default function SearchBar({ className }) {
    const pathname = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();

    const query = searchParams.get('query');
    const [searching, setSearching] = useState(false);
    const [queryValue, handleChangeQueryValue] = useInput(query || '');

    const handleSearch = event => {
        event.preventDefault();
        setSearching(true);
        const encodedQuery = encodeURI(queryValue);
        router.push(`/bypass?query=${encodedQuery}`);

        if (pathname === '/search') {
            window.location.reload();
        }
    };

    return (
        <form
            className={cn('relative z-20 flex flex-row gap-2', className)}
            onSubmit={handleSearch}
        >
            <Input
                className='bg-white'
                radius='sm'
                name='query'
                value={queryValue}
                placeholder='Buscar por libro, autor o serie...'
                onChange={handleChangeQueryValue}
                size='lg'
                variant='bordered'
                disabled={searching}
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
                isLoading={searching}
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
                isLoading={searching}
                isIconOnly
            >
                <SearchRegular />
            </Button>
        </form>
    );
}
