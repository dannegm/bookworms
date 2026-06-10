import { Helmet } from 'react-helmet-async';
import { useQuery } from '@tanstack/react-query';
import { BookOpen, Wifi, UserX, Send } from 'lucide-react';

import { getSummaries } from '@/services/bookworms';
import { thousands } from '@/helpers/strings';

import { Layout } from '@/components/layout/layout';
import { SearchBox } from '@/components/layout/search-box';
import { PageInner, SearchBoxContainer, Divider as HomeDivider } from '@/components/layout/primitives';
import { HomeFaqs } from '@/components/home/home-faqs';

const FEATURES = [
    {
        icon: BookOpen,
        title: 'Más de 150,000 títulos',
        desc: 'En español, organizados y con búsqueda aproximada.',
    },
    {
        icon: UserX,
        title: 'Sin registro',
        desc: 'Acceso directo, sin cuentas, sin contraseñas.',
    },
    {
        icon: Send,
        title: 'Envío a Kindle',
        desc: 'Recibe cualquier libro directamente en tu dispositivo.',
    },
    {
        icon: Wifi,
        title: 'Lector integrado',
        desc: 'Lee ePubs en el navegador, sin instalar nada.',
    },
];

const FeatureCard = ({ icon: Icon, title, desc }) => (
    <div className='flex gap-3.5 p-4 rounded-xl bg-card border border-border'>
        <div className='size-8 rounded-lg bg-brand/10 flex items-center justify-center text-brand shrink-0 mt-0.5'>
            <Icon className='size-4 stroke-[1.5]' />
        </div>
        <div>
            <p className='text-sm font-medium text-foreground font-noto mb-0.5'>{title}</p>
            <p className='text-xs text-muted-foreground font-noto leading-relaxed'>{desc}</p>
        </div>
    </div>
);

const Stats = () => {
    const { data } = useQuery(getSummaries());
    if (!data) return null;

    const items = [
        { value: thousands(data.books), label: 'libros' },
        { value: thousands(data.authors), label: 'autores' },
        { value: thousands(data.series), label: 'series' },
    ];

    return (
        <div className='grid grid-cols-3 divide-x divide-border border border-border rounded-xl overflow-hidden bg-card'>
            {items.map(({ value, label }) => (
                <div key={label} className='px-3 py-4 text-center'>
                    <div className='font-merriweather text-xl font-normal text-foreground mb-0.5'>
                        {value}
                    </div>
                    <div className='text-[11px] uppercase tracking-widest text-muted-foreground font-noto'>
                        {label}
                    </div>
                </div>
            ))}
        </div>
    );
};

export const About = () => (
    <Layout>
        <Helmet>
            <title>Sobre el proyecto — Bookworms</title>
        </Helmet>

        <SearchBoxContainer><SearchBox /></SearchBoxContainer>

        <PageInner className='pb-6'>
            <div className='w-9 h-0.75 bg-brand rounded-full mb-4.5' />

            <p className='text-[11px] uppercase tracking-widest text-brand font-noto mb-3'>
                El proyecto
            </p>
            <h1 className='font-merriweather font-normal text-[clamp(28px,7vw,40px)] leading-[1.1] text-foreground text-pretty mb-4'>
                Una biblioteca para quienes aman leer
            </h1>
            <p className='text-base text-foreground/70 font-noto leading-relaxed mb-8 text-pretty'>
                <b className='text-foreground font-medium'>Bookworms</b> es una biblioteca digital privada
                compartida entre un grupo pequeño de lectores. Sin registro, sin anuncios,
                sin complicaciones.
            </p>

            <Stats />
        </PageInner>

        <HomeDivider />

        <PageInner className='py-6'>
            <p className='text-[11px] uppercase tracking-widest text-brand font-noto mb-4'>
                Qué puedes hacer
            </p>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-2.5'>
                {FEATURES.map(f => <FeatureCard key={f.title} {...f} />)}
            </div>
        </PageInner>

        <HomeDivider />

        <PageInner className='py-6'>
            <p className='text-[11px] uppercase tracking-widest text-brand font-noto mb-4'>
                Sobre el catálogo
            </p>
            <div className='space-y-4 text-sm text-foreground/75 leading-relaxed font-noto text-pretty'>
                <p>
                    El proyecto nació como un fork de <i>La Biblioteca Secreta</i>. Desde entonces
                    ha sido rediseñado y extendido para facilitar el descubrimiento de libros.
                </p>
                <p>
                    Los libros provienen de{' '}
                    <a
                        href='https://annas-archive.org'
                        target='_blank'
                        rel='noopener noreferrer'
                        className='underline underline-offset-2 text-brand hover:text-brand/80 transition-colors'
                    >
                        Anna's Archive
                    </a>
                    . Bookworms no aloja archivos de forma permanente — los ficheros se
                    obtienen bajo demanda y se eliminan tras la descarga.
                </p>
                <p>
                    Si encuentras algún problema puedes{' '}
                    <a
                        href='/issues'
                        className='underline underline-offset-2 text-brand hover:text-brand/80 transition-colors'
                    >
                        reportarlo en GitHub
                    </a>
                    .
                </p>
            </div>
        </PageInner>

        <HomeDivider />
        <HomeFaqs />
    </Layout>
);
