'use client';
import { NextUIProvider } from '@nextui-org/react';

import EnviromentProvider from '@/providers/enviroment-provider';
import { Suspense } from 'react';

export default function Providers({ environmentInfo, children }) {
    return (
        <EnviromentProvider data={environmentInfo}>
            <NextUIProvider>
                <Suspense>{children}</Suspense>
            </NextUIProvider>
        </EnviromentProvider>
    );
}
