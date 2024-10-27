import './globals.css';

import { getEnvironmentInfo } from '@/helpers/environment';
import RootLayout from '@/components/layout/root-layout';

const environmentInfo = getEnvironmentInfo();

export const metadata = {
    title: 'Bookworms',
    other: {
        ...environmentInfo,
    },
};

export default function Layout({ children }) {
    return <RootLayout environmentInfo={environmentInfo}>{children}</RootLayout>;
}
