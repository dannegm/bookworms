import { Helmet } from 'react-helmet-async';
import { Link } from '@tanstack/react-router';
import { Heart } from 'lucide-react';

import { useDocumentClassNames } from '@/hooks/use-document-class-names';
import { useSettings } from '@/hooks/use-settings';
import { useDarkMode } from '@/hooks/use-dark-mode';

import { BreakpointIndicator } from '@/components/system/breakpoint-indicator';
import { DarkModeToggle } from '@/components/system/dark-mode-toggle';
import { DebugModeToggle } from '@/components/system/debug-mode-toggle';
import { TrackClick } from '@/components/system/track-click';

import { BucketStatus } from '@/components/layout/bucket-status';
import { Footer } from '@/components/layout/footer';
import { Logo } from '@/components/layout/logo';

export const Layout = ({ title, children }) => {
    const [secrets] = useSettings('settings:secrets:show', false);
    const [theme] = useDarkMode();

    useDocumentClassNames({
        root: 'light',
        body: 'antialiased',
    });

    return (
        <main>
            <Helmet defaultTitle='Bookworms' titleTemplate='%s | Bookworms'>
                {title && <title>{title}</title>}
            </Helmet>

            <BreakpointIndicator />

            <div className='relative bg-background'>
                <header className='sticky top-0 z-10 bg-background border-b border-border'>
                    <div className='w-main mx-auto px-5 py-3 flex items-center justify-between'>
                        <Link to='/' className='hover:text-brand transition-colors duration-150'>
                            <Logo />
                        </Link>

                        <div className='flex gap-1'>
                            {secrets && (
                                <TrackClick name='debug:toggle'>
                                    <DebugModeToggle />
                                </TrackClick>
                            )}

                            <Link
                                to='/activity'
                                className='inline-flex items-center gap-1.5 h-9 px-3 rounded-md text-sm font-noto text-brand bg-brand/10 hover:bg-brand/15 transition-colors'
                            >
                                <Heart className='size-3.5' />
                                Actividad
                            </Link>

                            <TrackClick name='dark-mode:toggle' data={{ theme }}>
                                <DarkModeToggle />
                            </TrackClick>
                        </div>
                    </div>
                </header>

                <BucketStatus />

                {children}

                <Footer />
            </div>
        </main>
    );
};
