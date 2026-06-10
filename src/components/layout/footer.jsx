import { useQuery } from '@tanstack/react-query';

import { getSummaries, getSettings } from '@/services/bookworms';
import { thousands } from '@/helpers/strings';
import { formatDate } from '@/helpers/date';
import { Logo } from './logo';

const useCatalogMeta = () => {
    const { data: summaries } = useQuery(getSummaries());
    const { data: settings } = useQuery(getSettings());

    const bookCount = summaries?.books ?? null;
    const lastUpdate = settings?.['library.last_update']
        ? formatDate(settings['library.last_update'])
        : null;

    return { bookCount, lastUpdate };
};

export const Footer = () => {
    const { bookCount, lastUpdate } = useCatalogMeta();

    return (
        <footer className='border-t border-border'>
            <div className='w-main mx-auto px-5 pt-4 sm:pb-6 sm:pt-8'>
                <div className='flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-6 mb-6'>
                    <Logo className='text-lg' />

                    <nav className='flex flex-col sm:flex-row gap-2 sm:gap-5 sm:items-center'>
                        <a
                            href='/explore'
                            className='text-sm text-muted-foreground hover:text-brand transition-colors font-noto'
                        >
                            Explorar
                        </a>
                        <a
                            href='/about'
                            className='text-sm text-muted-foreground hover:text-brand transition-colors font-noto'
                        >
                            Sobre el proyecto
                        </a>
                        <a
                            href='/issues'
                            target='_blank'
                            rel='noopener noreferrer'
                            className='text-sm text-muted-foreground hover:text-brand transition-colors font-noto'
                        >
                            Reportar un problema
                        </a>
                    </nav>
                </div>

                <div className='h-px bg-border mb-5' />

                <p className='text-xs text-muted-foreground leading-[1.7] mb-4 font-noto'>
                    Los libros disponibles en <b>Bookworms</b> provienen de{' '}
                    <a
                        href='https://annas-archive.org'
                        target='_blank'
                        rel='noopener noreferrer'
                        className='underline underline-offset-2 hover:text-brand transition-colors'
                    >
                        Anna&apos;s Archive
                    </a>
                    . <b>Bookworms</b> no se hace responsable del uso que se haga de los mismos. El
                    uso de esta plataforma implica que el usuario conoce y acepta las leyes de su
                    país respecto a la distribución de material con derechos de autor.
                </p>

                <div className='flex justify-between items-center sm:gap-4 flex-wrap mb-8'>
                    <span className='text-[11px] text-muted-foreground/70 font-noto'>
                        MIT License © {new Date().getFullYear()}
                    </span>
                    <span className='text-[11px] text-muted-foreground/70 text-right font-noto'>
                        {lastUpdate && bookCount ? (
                            `Catálogo al ${lastUpdate} · ${thousands(bookCount)} títulos`
                        ) : (
                            <span className='inline-block h-2.5 w-52 rounded bg-muted animate-pulse' />
                        )}
                    </span>
                </div>
            </div>
        </footer>
    );
};
