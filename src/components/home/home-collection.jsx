import { cn } from '@/helpers/utils';
import { Eyebrow, SectionTitle, SectionDesc, PageInner } from '@/components/home/home-primitives';

const MOCK_COVERS = [
    {
        title: 'Left Hand of Darkness',
        author: 'Ursula K. Le Guin',
        className: 'bg-gradient-to-b from-[#1e0f2e] to-[#4a1a6e]',
    },
    {
        title: 'The Name of the Wind',
        author: 'Patrick Rothfuss',
        className: 'bg-gradient-to-b from-[#0d2218] to-[#1a5c38]',
    },
    {
        title: 'Dune',
        author: 'Frank Herbert',
        className: 'bg-gradient-to-b from-[#2a0808] to-[#8a2020]',
    },
    {
        title: 'Foundation',
        author: 'Isaac Asimov',
        className: 'bg-gradient-to-b from-[#0a1828] to-[#1a4878]',
    },
];

const MockCover = ({ title, author, className }) => (
    <div className='cursor-pointer group'>
        <div
            className={cn(
                'aspect-2/3 rounded-lg border border-border overflow-hidden mb-2',
                'transition-transform duration-150 group-hover:-translate-y-0.5',
                className,
            )}
        >
            <div className='w-full h-full flex items-end p-2'>
                <span className='text-[9px] text-white/75 leading-tight font-merriweather'>{title}</span>
            </div>
        </div>
        <div className='text-[11px] font-medium text-foreground truncate font-noto'>{title}</div>
        <div className='text-[10px] text-muted-foreground truncate font-noto'>{author}</div>
    </div>
);

export const HomeCollection = () => (
    <PageInner>
        <Eyebrow className='mb-1.5'>Colección de la semana</Eyebrow>
        <SectionTitle className='mb-1.5'>Mundos que te van a costar tres noches</SectionTitle>
        <SectionDesc className='mb-4.5'>
            Ciencia ficción densa, worldbuilding brutal, finales que no cierran del todo.
        </SectionDesc>
        <div className='grid grid-cols-4 gap-2.5 mb-3.5 max-[400px]:grid-cols-2'>
            {MOCK_COVERS.map((cover) => (
                <MockCover key={cover.title} {...cover} />
            ))}
        </div>
        <a className='text-sm text-brand inline-flex items-center gap-1 font-noto hover:text-brand/80 transition-colors' href='#'>
            Ver colección completa <span aria-hidden='true'>→</span>
        </a>
    </PageInner>
);
