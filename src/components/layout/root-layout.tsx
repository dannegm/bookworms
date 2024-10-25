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
        <Providers environmentInfo={environmentInfo}>
            <html lang='en'>
                <body className={cn(noto.className, 'antialiased')}>
                    <Debugger />
                    {children}
                </body>
            </html>
        </Providers>
    );
}
