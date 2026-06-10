import { Helmet } from 'react-helmet-async';

import { Layout } from '@/components/layout/layout';
import { SearchBox } from '@/components/layout/search-box';
import { PageInner } from '@/components/home/home-primitives';

export const About = () => (
    <Layout>
        <Helmet>
            <title>Sobre el proyecto — Bookworms</title>
        </Helmet>

        <SearchBox />

        <PageInner className='max-w-prose'>
            <div className='w-9 h-0.75 bg-brand rounded-full mb-4.5' />
            <h1 className='font-merriweather font-normal text-[clamp(28px,7vw,40px)] leading-[1.1] text-foreground mb-6'>
                Sobre Bookworms
            </h1>

            <div className='space-y-5 text-sm text-foreground/80 leading-relaxed font-noto'>
                <p>
                    <b className='text-foreground'>Bookworms</b> es una biblioteca digital privada con más
                    de 150,000 títulos en español, compartida entre un grupo pequeño de lectores. No
                    requiere registro, no tiene anuncios, y nunca los tendrá.
                </p>

                <p>
                    El proyecto nació como un fork de <i>La Biblioteca Secreta</i>. Desde entonces ha
                    sido rediseñado y extendido para facilitar el descubrimiento de libros: búsqueda
                    aproximada, colecciones temáticas, envío directo a Kindle y un lector integrado.
                </p>

                <p>
                    Los libros provienen de{' '}
                    <a
                        href='https://annas-archive.org'
                        target='_blank'
                        rel='noopener noreferrer'
                        className='underline underline-offset-2 text-brand hover:text-brand/80 transition-colors'
                    >
                        Anna&apos;s Archive
                    </a>
                    . Bookworms no aloja archivos de forma permanente — los ficheros se obtienen
                    bajo demanda desde un repositorio de torrents y se eliminan tras la descarga.
                </p>

                <p>
                    Si encuentras algún problema, puedes{' '}
                    <a
                        href='https://github.com/dannegm/bookworms/issues'
                        target='_blank'
                        rel='noopener noreferrer'
                        className='underline underline-offset-2 text-brand hover:text-brand/80 transition-colors'
                    >
                        reportarlo en GitHub
                    </a>
                    .
                </p>
            </div>
        </PageInner>
    </Layout>
);
