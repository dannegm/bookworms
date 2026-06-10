import { format } from 'date-fns';
import { es as locale } from 'date-fns/locale';
import { TriangleAlert } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';

import { getSettings } from '@/services/bookworms';
import { PageInner } from '@/components/layout/primitives';

export const BucketStatus = () => {
    const { data } = useQuery(getSettings({ refetchOnWindowFocus: true, refetchOnReconnect: true }));

    if (data?.['bucket.online'] !== false) return null;

    return (
        <PageInner className='pt-4 pb-0'>
            <div className='flex items-start gap-3 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3.5 dark:bg-rose-950/70 dark:border-rose-700/60'>
                <TriangleAlert className='size-4 shrink-0 text-rose-600 dark:text-rose-400 mt-0.5' />
                <p className='text-sm font-noto text-rose-800 dark:text-rose-300'>
                    El servicio de descarga y lectura en línea no está disponible
                    {data?.['bucket.offline_until'] && (
                        <>
                            {' · '}Hasta el{' '}
                            <span className='font-medium text-rose-900 dark:text-rose-200'>
                                {format(new Date(data['bucket.offline_until']), "d 'de' MMMM 'del' yyyy", { locale })}
                            </span>
                        </>
                    )}
                </p>
            </div>
        </PageInner>
    );
};
