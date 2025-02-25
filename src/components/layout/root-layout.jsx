import { Noto_Sans } from 'next/font/google';

import { cn } from '@/helpers/utils';
import Providers from '@/providers/providers';
import Debugger from '@/components/common/debugger';

const noto = Noto_Sans({
    weight: ['400', '600'],
    subsets: ['latin'],
});

const UNABLED = false;

export default function RootLayout({ environmentInfo, children }) {
    return (
        <html lang='en' className='light'>
            <body className={cn(noto.className, 'antialiased')}>
                <Providers environmentInfo={environmentInfo}>
                    <Debugger />

                    {UNABLED && (
                        <div className='bg-yellow-100 text-yellow-800 p-4 border border-yellow-300 rounded-md text-center'>
                            La descarga de libros estará deshabilitada hasta el 25 de febrero.
                        </div>
                    )}
                    {children}
                </Providers>
            </body>
        </html>
    );
}
