import { Helmet } from 'react-helmet-async';
import { Link } from '@tanstack/react-router';

import { useDocumentClassNames } from '@/hooks/use-document-class-names';
import { useSettings } from '@/hooks/use-settings';

import { BreakpointIndicator } from '@/components/system/breakpoint-indicator';
import { DarkModeToggle } from '@/components/system/dark-mode-toggle';
import { DebugModeToggle } from '@/components/system/debug-mode-toggle';

import { Section } from '@/components/layout/section';
import { Logo } from '@/components/layout/logo';
import { BucketStatus } from '@/components/layout/bucket-status';
import { TrackClick } from '@/components/system/track-click';
import { useDarkMode } from '@/hooks/use-dark-mode';

export const Layout = ({ title, hideLogo = false, children }) => {
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
                <Section
                    className='flex flex-row items-center'
                    classNames={{ wrapper: 'sticky top-0 z-10 bg-background' }}
                >
                    {!hideLogo && (
                        <Link className='flex flex-row items-center gap-2' to='/'>
                            <Logo />
                        </Link>
                    )}

                    <div className='flex-1' />

                    <div className='-m-2 ml-0 flex gap-2'>
                        {secrets && (
                            <TrackClick name='debug:toggle'>
                                <DebugModeToggle />
                            </TrackClick>
                        )}

                        <TrackClick name='dark-mode:toggle' data={{ theme }}>
                            <DarkModeToggle />
                        </TrackClick>
                    </div>
                </Section>

                <BucketStatus />

                {children}

                <Section className='h-[54px]' />
            </div>
        </main>
    );
};
