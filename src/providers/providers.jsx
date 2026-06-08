import { Suspense } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NuqsAdapter } from 'nuqs/adapters/react';
import { Toaster } from '@/ui/sonner';

import { DarkModeProvider } from '@/providers/dark-mode-provider';
import { TrackersProvider } from '@/providers/trackers-provider';

const queryClient = new QueryClient();

export const Providers = ({ children }) => {
    return (
        <HelmetProvider>
        <NuqsAdapter>
            <TrackersProvider>
                <QueryClientProvider client={queryClient}>
                    <DarkModeProvider>
                        <Suspense>
                            {children}
                            <Toaster />
                        </Suspense>
                    </DarkModeProvider>
                </QueryClientProvider>
            </TrackersProvider>
        </NuqsAdapter>
        </HelmetProvider>
    );
};
