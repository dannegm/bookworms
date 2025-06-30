import { Helmet } from 'react-helmet';
import { Link } from 'wouter';

import { useDocumentClassNames } from '@/modules/core/hooks/use-document-class-names';
import { useSettings } from '@/modules/core/hooks/use-settings';

import { BreakpointIndicator } from '@/modules/core/components/breakpoint-indicator';
import { DarkModeToggle } from '@/modules/core/components/dark-mode-toggle';
import { DebugModeToggle } from '@/modules/core/components/debug-mode-toggle';

import { Section } from '@/modules/main/components/section';
import { Logo } from '@/modules/main/components/logo';
import { BucketStatus } from '@/modules/main/components/bucket-status';
import { TrackClick } from '@/modules/core/components/track-click';
import { useDarkMode } from '@/modules/core/hooks/use-dark-mode';

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
                        <Link className='flex flex-row items-center gap-2' href='/'>
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
