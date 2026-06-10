import { useQuery } from '@tanstack/react-query';

import { getSummaries } from '@/services/bookworms';
import { compact } from '@/helpers/strings';
import { PageInner } from '@/components/home/home-primitives';

export const HomeExplore = () => {
    const { data } = useQuery(getSummaries());

    const label = data?.books ? `+${compact(data.books, 0)}` : '+150k';

    return (
        <PageInner>
            <div className='relative overflow-hidden rounded-2xl bg-brand/8 border border-brand/20 px-7 py-8'>
                <span
                    aria-hidden='true'
                    className='absolute right-4 top-1/2 -translate-y-1/2 font-merriweather text-[120px] leading-none font-normal text-brand/8 select-none pointer-events-none'
                >
                    {label}
                </span>

                <p className='text-[11px] uppercase tracking-widest text-brand font-noto mb-3'>
                    La biblioteca completa
                </p>
                <h2 className='font-merriweather font-normal text-[clamp(20px,5vw,28px)] leading-[1.2] text-foreground mb-2 max-w-sm'>
                    Hay mucho más esperándote
                </h2>
                <p className='text-sm text-foreground/60 font-noto mb-6 max-w-xs leading-relaxed'>
                    Colecciones temáticas, temas curados y miles de títulos organizados para que encuentres tu próxima lectura.
                </p>
                <a
                    href='/explore'
                    className='inline-flex items-center gap-2 bg-brand text-brand-foreground text-sm font-medium font-noto px-5 py-2.5 rounded-xl hover:bg-brand/90 transition-colors'
                >
                    Explorar la biblioteca <span aria-hidden='true'>→</span>
                </a>
            </div>
        </PageInner>
    );
};
