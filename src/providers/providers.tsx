'use client';
import type { ChildrenContainer } from '@/types/common';
import type { EnvironmentInfo } from '@/helpers/environment';

import EnviromentProvider from '@/providers/enviroment-provider';

export interface ProvidersProps extends ChildrenContainer {
    environmentInfo?: EnvironmentInfo;
}

export default function Providers({ environmentInfo, children }: ProvidersProps) {
    return <EnviromentProvider data={environmentInfo}>{children}</EnviromentProvider>;
}
