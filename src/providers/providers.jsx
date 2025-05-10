'use client';
import { Suspense } from 'react';
import { NextUIProvider } from '@nextui-org/react';

import EnviromentProvider from '@/providers/enviroment-provider';
import { TrackersProvider } from '@/providers/trackers-provider';

export default function Providers({ environmentInfo, children }) {
    return (
        <EnviromentProvider data={environmentInfo}>
            <TrackersProvider>
                <NextUIProvider>
                    <Suspense>{children}</Suspense>
                </NextUIProvider>
            </TrackersProvider>
        </EnviromentProvider>
    );
}
