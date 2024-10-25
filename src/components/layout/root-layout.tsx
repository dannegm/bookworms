import { Suspense } from 'react';
import { Noto_Sans } from 'next/font/google';

import { cn } from '@/helpers/utils';
import Providers, { type ProvidersProps } from '@/providers/providers';
import Debugger from '@/components/common/debugger';

const noto = Noto_Sans({
    weight: ['400', '600'],
    subsets: ['latin'],
});

export default function RootLayout({ environmentInfo, children }: ProvidersProps) {
    return (
        <html lang='en'>
            <body className={cn(noto.className, 'antialiased')}>
                <Providers environmentInfo={environmentInfo}>
                    <Debugger />
                    {children}
                </Providers>
            </body>
        </html>
    );
}
