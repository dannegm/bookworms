import { SearchChips } from '@/components/layout/search-chips';
import { PageInner } from '@/components/layout/primitives';

export const SearchEmpty = () => (
    <PageInner>
        <div className='w-9 h-0.75 bg-brand rounded-full mb-4.5' />
        <h2 className='font-merriweather font-normal text-[clamp(22px,5vw,30px)] leading-[1.15] text-foreground mb-2'>
            ¿Qué quieres leer hoy?
        </h2>
        <p className='text-sm text-muted-foreground font-noto mb-5 leading-relaxed'>
            Escribe el título de un libro, el nombre de un autor o una serie en el buscador de arriba.
        </p>
        <p className='text-[11px] uppercase tracking-widest text-brand font-noto mb-3'>
            Sugerencias
        </p>
        <SearchChips />
    </PageInner>
);
