import { Avatar } from '@nextui-org/avatar';

import { cn } from '@/helpers/utils';
import { keyCase } from '@/helpers/strings';

import BooksRegular from '../icons/books-regular';
import BookRegular from '../icons/book-regular';

const tailwindBackgrounds = [
    'bg-red-500',
    'bg-orange-500',
    'bg-yellow-500',
    'bg-lime-500',
    'bg-emerald-500',
    'bg-teal-500',
    'bg-cyan-500',
    'bg-sky-500',
    'bg-blue-500',
    'bg-indigo-500',
    'bg-violet-500',
    'bg-purple-500',
    'bg-fuchsia-500',
    'bg-pink-500',
    'bg-rose-500',
];

const getRandomBackground = () => {
    const randomIndex = Math.floor(Math.random() * tailwindBackgrounds.length);
    return tailwindBackgrounds[randomIndex];
};

export default function SeriePreview({ className, serie }) {
    return (
        <a
            href={`/serie/${keyCase(serie.name)}`}
            className={cn(
                'flex flex-row items-center gap-4 bg-slate-200 py-2 px-2 pr-6 rounded-full transition-all',
                'hover:shadow-xl active:shadow-sm',
                className,
            )}
        >
            <Avatar
                className={cn(
                    'flex-none w-[48px] h-[48px] transition-all',
                    'hover:shadow-lg hover:scale-110',
                    getRandomBackground(),
                )}
                showFallback
                fallback={<BooksRegular className={cn('w-6 h-6 text-white')} size={20} />}
            />

            <div className=''>
                <h3 className='font-bold text-sm text-slate-700'>{serie.name}</h3>
                <p className='-ml-[3px] flex flex-row gap-2 items-center text-sm text-slate-500'>
                    <BookRegular />
                    <b>{serie.books}</b> Libros
                </p>
            </div>
        </a>
    );
}
