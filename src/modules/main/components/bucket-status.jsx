import { format } from 'date-fns';
import { es as locale } from 'date-fns/locale';
import { BadgeInfo } from 'lucide-react';

import { cn } from '@/modules/core/helpers/utils';
import { getSettings } from '@/modules/core/services/bookworms';

import { DataLoader } from '@/modules/core/components/data-loader';

import { Section } from '@/modules/main/components/section';
import { Alert, AlertDescription, AlertTitle } from '@/modules/shadcn/ui/alert';

const EmptyLoader = () => <></>;

export const BucketStatus = ({ className }) => {
    return (
        <DataLoader query={getSettings()} tags={['settings']} loader={<EmptyLoader />}>
            {({ data }) => (
                <>
                    {data?.['bucket.online'] === false && (
                        <Section className={cn(className)}>
                            <Alert className='bg-yellow-50 border-yellow-200 text-yellow-800 dark:bg-yellow-900 dark:border-yellow-800 dark:text-yellow-300'>
                                <BadgeInfo className='size-4' />

                                <AlertTitle>Servicio no disponible</AlertTitle>
                                <AlertDescription className='text-yellow-700 dark:text-yellow-200'>
                                    El servicio de descarga no está disponible
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
                    )}
                </>
            )}
        </DataLoader>
    );
};
