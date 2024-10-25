'use client';
import type { ChildrenContainer } from '@/types/common';
import type { EnvironmentInfo } from '@/helpers/environment';
import { NextUIProvider } from '@nextui-org/react';

import EnviromentProvider from '@/providers/enviroment-provider';
import { Suspense } from 'react';

export interface ProvidersProps extends ChildrenContainer {
    environmentInfo?: EnvironmentInfo;
}

export default function Providers({ environmentInfo, children }: ProvidersProps) {
    return (
        <EnviromentProvider data={environmentInfo}>
            <NextUIProvider>
                <Suspense>{children}</Suspense>
            </NextUIProvider>
        </EnviromentProvider>
    );
}
