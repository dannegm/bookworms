import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { toast } from 'sonner';
import { CloudCog, Frown, Loader2, Send } from 'lucide-react';

import { cn, match } from '@/modules/core/helpers/utils';
import { useDelayedEffect } from '@/modules/core/hooks/use-delayed-effect';
import { useSettings } from '@/modules/core/hooks/use-settings';

import {
    requestBookFile,
    sendBookToKindle,
    validateBookFile,
} from '@/modules/core/services/bookworms';

import { Button } from '@/modules/shadcn/ui/button';
import { TrackClick } from '@/modules/core/components/track-click';
import { ResponsivePopover } from '@/modules/shadcn/ui/responsive-popover';
import { Label } from '@/modules/shadcn/ui/label';
import { Input } from '@/modules/shadcn/ui/input';
import { Checkbox } from '@/modules/shadcn/ui/checkbox';

const DownloadStates = {
    UNINITIALIZED: 'UNINITIALIZED',
    REGISTERED: 'REGISTERED',
    REQUESTED: 'REQUESTED',
    AVAILABLE: 'AVAILABLE',
    SENDING: 'SENDING',
    REJECTED: 'REJECTED',
};

const SendButton = ({ className, book, size, email, onSent }) => {
    const [downloadState, setDownloadState] = useState(DownloadStates.UNINITIALIZED);

    const handleRequest = async event => {
        event.preventDefault();
        await requestBookFile(book.filename);
        setDownloadState(DownloadStates.REQUESTED);
    };

    const handleSend = async event => {
        event.preventDefault();
        setDownloadState(DownloadStates.SENDING);
        try {
            const filename = book.filename; //.replace(/\.epub$/i, '.mobi');
            await sendBookToKindle({ filename, email });
            setDownloadState(DownloadStates.UNINITIALIZED);
            onSent?.();
        } catch (err) {
            setDownloadState(DownloadStates.REJECTED);
        }
    };

    useDelayedEffect(
        () => {
            if (downloadState === DownloadStates.REQUESTED) {
                const validateRequest = async () => {
                    const filename = book.filename; //.replace(/\.epub$/i, '.mobi');
                    const isValid = await validateBookFile(filename);
                    setDownloadState(isValid ? DownloadStates.AVAILABLE : DownloadStates.REJECTED);
                };
                validateRequest();
            }
        },
        [downloadState],
        5 * 1000,
    );

    return match({ state: downloadState })
        .with({ state: DownloadStates.UNINITIALIZED }, () => (
            <TrackClick className={cn(className)} name='book:request' data={{ book }}>
                <Button
                    size={size}
                    className={cn('bg-fuchsia-400 hover:bg-fuchsia-500 text-white', className)}
                    onClick={handleRequest}
                    disabled={!email}
                >
                    <CloudCog />
                    Solicitar
                </Button>
            </TrackClick>
        ))
        .with({ state: DownloadStates.REQUESTED }, () => (
            <Button
                size={size}
                className={cn('bg-fuchsia-400 hover:bg-fuchsia-500 text-white', className)}
                disabled
            >
                <Loader2 className='animate-spin' />
                Solicitando
            </Button>
        ))
        .with({ state: DownloadStates.AVAILABLE }, () => (
            <TrackClick className={cn(className)} name='book:send-to-kindle' data={{ book }}>
                <Button
                    size={size}
                    className={cn('bg-green-400 hover:bg-green-500 text-white', className)}
                    onClick={handleSend}
                >
                    <Send />
                    Enviar
                </Button>
            </TrackClick>
        ))
        .with({ state: DownloadStates.SENDING }, () => (
            <Button
                size={size}
                className={cn('bg-green-400 hover:bg-green-500 text-white', className)}
                disabled
            >
                <Loader2 className='animate-spin' />
                Enviando
            </Button>
        ))
        .with({ state: DownloadStates.REJECTED }, () => (
            <Button
                size={size}
                className={cn('bg-red-400 hover:bg-red-500 text-white', className)}
                disabled
            >
                <Frown />
                No disponible
            </Button>
        ))
        .run();
};

export const SendToKindle = ({ className, book, size = 'default' }) => {
    const [open, setOpen] = useState(false);
    const { control, register, watch } = useForm();

    const [rememberEmail, setRememberEmail] = useSettings('settings:kindle-email', '');

    const onSubmit = ev => ev.preventDefault();

    const handleSent = () => {
        setOpen(false);

        if (!rememberEmail && watch('remember_email')) {
            setRememberEmail(watch('kindle_email'));
        }

        toast('Libro enviado', {
            description: 'Hemos enviado el libro a tu Kindle.',
        });
    };

    if (rememberEmail) {
        return (
            <SendButton
                className={className}
                size={size}
                book={book}
                email={rememberEmail}
                onSent={handleSent}
            />
        );
    }

    return (
        <ResponsivePopover
            open={open}
            onOpenChange={setOpen}
            className='mt-0 pt-0'
            classNames={{
                content:
                    'mt-0 pt-0 sm:bg-popover sm:p-4 sm:w-80 sm:border sm:border-accent-200 sm:dark:border-accent-700 sm:rounded-md sm:shadow-lg',
            }}
            trigger={
                <Button
                    size={size}
                    className={cn('bg-fuchsia-400 hover:bg-fuchsia-500 text-white', className)}
                >
                    <Send />
                    Enviar al Kindle
                </Button>
            }
            props={{
                content: {
                    side: 'top',
                    sideOffset: 8,
                    align: 'start',
                },
            }}
        >
            <form className='flex flex-col gap-4 py-8 sm:py-0' onSubmit={onSubmit}>
                <h1 className='text-sm font-bold'>Enviar a Kindle</h1>

                <div className='flex flex-col gap-2'>
                    <Label htmlFor='kindle_email'>Escribe tu email de tu Kindle</Label>
                    <Input
                        type='email'
                        placeholder='Kindle Email'
                        id='kindle_email'
                        {...register('kindle_email', { required: true })}
                    />
                </div>

                <div className='flex gap-4 items-center justify-between'>
                    <Controller
                        name='remember_email'
                        control={control}
                        render={({ field }) => (
                            <div className='flex items-center gap-2'>
                                <Checkbox
                                    id='remember_email'
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                />
                                <Label htmlFor='remember_email'>Recordar email</Label>
                            </div>
                        )}
                    />

                    <SendButton book={book} email={watch('kindle_email')} onSent={handleSent} />
                </div>
            </form>
        </ResponsivePopover>
    );
};
