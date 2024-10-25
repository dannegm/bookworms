import './globals.css';

import type { Metadata } from 'next';
import type { ChildrenContainer } from '@/types/common';

import { getEnvironmentInfo } from '@/helpers/environment';
import RootLayout from '@/components/layout/root-layout';

const environmentInfo = getEnvironmentInfo();

export const metadata: Metadata = {
    title: 'Bookworms',
    other: {
        ...environmentInfo,
    },
};

export default function Layout({ children }: Readonly<ChildrenContainer>) {
    return <RootLayout environmentInfo={environmentInfo}>{children}</RootLayout>;
}
