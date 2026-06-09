export const Footer = () => (
    <footer className='border-t border-border mt-12'>
        <div className='w-main mx-auto px-5 pt-8 pb-7'>
            <div className='flex justify-between items-start gap-6 flex-wrap mb-6'>
                <span className='font-merriweather text-lg font-normal text-foreground'>Bookworms</span>
                <nav className='flex gap-5 flex-wrap items-center'>
                    <a href='/search' className='text-sm text-muted-foreground hover:text-brand transition-colors font-noto'>
                        Explorar
                    </a>
                    <a href='#' className='text-sm text-muted-foreground hover:text-brand transition-colors font-noto'>
                        Sobre el proyecto
                    </a>
                    <a
                        href='https://github.com/dannegm/bookworms/issues'
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
                Los libros disponibles en Bookworms provienen de{' '}
                <a
                    href='https://annas-archive.org'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='underline underline-offset-2 hover:text-brand transition-colors'
                >
                    Anna&apos;s Archive
                </a>
                . No me hago responsable del uso que se haga de los mismos. El uso de esta
                plataforma implica que el usuario conoce y acepta las leyes de su país respecto
                a la distribución de material con derechos de autor.
            </p>

            <div className='flex justify-between items-center gap-4 flex-wrap'>
                <span className='text-[11px] text-muted-foreground/70 font-noto'>MIT License © 2026</span>
                <span className='text-[11px] text-muted-foreground/70 text-right font-noto'>
                    Catálogo al 1 de enero de 2026 · 153,602 títulos
                </span>
            </div>
        </div>
    </footer>
);
