import { format } from 'date-fns';
import { es as locale } from 'date-fns/locale';
import { BadgeInfo } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';

import { cn } from '@/helpers/utils';
import { getSettings } from '@/services/bookworms';

import { Section } from '@/components/layout/section';
import { Alert, AlertDescription, AlertTitle } from '@/ui/alert';

export const BucketStatus = ({ className }) => {
    const { data } = useQuery(getSettings());

    if (data?.['bucket.online'] !== false) return null;

    return (
        <Section className={cn(className)}>
            <Alert className='bg-yellow-50 border-yellow-200 text-yellow-800 dark:bg-yellow-900 dark:border-yellow-800 dark:text-yellow-300'>
                <BadgeInfo className='size-4' />

                <AlertTitle>Servicio no disponible</AlertTitle>
                <AlertDescription className='text-yellow-700 dark:text-yellow-200'>
                    El servicio de descarga y lectura en línea no está disponible
                </AlertDescription>

                {data?.['bucket.offline_until'] && (
                    <AlertDescription className='font-bold text-yellow-700 dark:text-yellow-200'>
                        Hasta el próximo{' '}
                        {format(
                            new Date(data['bucket.offline_until']),
                            "d 'de' MMMM 'del' yyyy",
                            { locale },
                        )}
                    </AlertDescription>
                )}
            </Alert>
        </Section>
    );
};
