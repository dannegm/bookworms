import { Eyebrow, PageInner } from '@/components/home/home-primitives';

const MOODS = [
    {
        text: 'Algo oscuro',
        sub: 'Thriller, noir',
        icon: (
            <svg viewBox='0 0 28 28' fill='none' className='size-7'>
                <path d='M14 4C14 4 8 9 8 15a6 6 0 0012 0c0-6-6-11-6-11z' stroke='currentColor' strokeWidth='1.5' strokeLinejoin='round' />
                <path d='M14 15v5' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' />
                <circle cx='14' cy='22' r='1' fill='currentColor' />
            </svg>
        ),
    },
    {
        text: 'Que enganche',
        sub: 'Ritmo rápido',
        icon: (
            <svg viewBox='0 0 28 28' fill='none' className='size-7'>
                <path d='M6 14h6l2-8 2 16 2-8h4' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
            </svg>
        ),
    },
    {
        text: 'Otro mundo',
        sub: 'Sci-fi, fantasía',
        icon: (
            <svg viewBox='0 0 28 28' fill='none' className='size-7'>
                <circle cx='14' cy='14' r='5' stroke='currentColor' strokeWidth='1.5' />
                <path d='M14 4v2M14 22v2M4 14h2M22 14h2M7.05 7.05l1.41 1.41M19.54 19.54l1.41 1.41M7.05 20.95l1.41-1.41M19.54 8.46l1.41-1.41' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' />
            </svg>
        ),
    },
    {
        text: 'Para pensar',
        sub: 'Ensayo, filosofía',
        icon: (
            <svg viewBox='0 0 28 28' fill='none' className='size-7'>
                <path d='M9 6h10M7 10h14M5 14h18M7 18h14M9 22h10' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' />
            </svg>
        ),
    },
    {
        text: 'Clásico',
        sub: 'Literatura canónica',
        icon: (
            <svg viewBox='0 0 28 28' fill='none' className='size-7'>
                <path d='M5 6h8v16H5zM15 6h8v16h-8z' stroke='currentColor' strokeWidth='1.5' strokeLinejoin='round' />
                <path d='M13 8c0 0 1 2 1 6s-1 6-1 6' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' />
            </svg>
        ),
    },
    {
        text: 'Ligero',
        sub: 'Romance, comedia',
        icon: (
            <svg viewBox='0 0 28 28' fill='none' className='size-7'>
                <path d='M14 6C10 6 7 9 7 12c0 4 4 7 7 10 3-3 7-6 7-10 0-3-3-6-7-6z' stroke='currentColor' strokeWidth='1.5' strokeLinejoin='round' />
            </svg>
        ),
    },
];

const MoodChip = ({ text, sub, icon }) => (
    <button
        type='button'
        className='bg-card border border-border rounded-[10px] p-3.5 text-left hover:border-brand transition-colors duration-150'
    >
        <div className='text-brand mb-2'>{icon}</div>
        <div className='text-xs font-medium text-foreground font-noto'>{text}</div>
        <div className='text-[11px] text-muted-foreground mt-0.5 font-noto'>{sub}</div>
    </button>
);

export const HomeMood = () => (
    <PageInner>
        <Eyebrow className='mb-3'>¿Qué quieres leer hoy?</Eyebrow>
        <div className='grid grid-cols-2 sm:grid-cols-3 gap-2'>
            {MOODS.map((mood) => (
                <MoodChip key={mood.text} {...mood} />
            ))}
        </div>
    </PageInner>
);
