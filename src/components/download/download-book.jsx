import { useState } from 'react';
import { Download, DownloadCloud, Frown, Loader2 } from 'lucide-react';

import { cn, downloadBlob, match } from '@/helpers/utils';
import { useDelayedEffect } from '@/hooks/use-delayed-effect';
import { useDownloads } from '@/hooks/use-local-list';

import { TrackClick } from '@/components/system/track-click';
import { Button } from '@/ui/button';

import {
    downloadBookFile,
    requestBookFile,
    validateBookFile,
} from '@/services/bookworms';

const DownloadStates = {
    UNINITIALIZED: 'UNINITIALIZED',
    REQUESTED: 'REQUESTED',
    AVAILABLE: 'AVAILABLE',
    DOWNLOADING: 'DOWNLOADING',
    REJECTED: 'REJECTED',
};

const bookSnapshot = book => ({
    libid: book.libid,
    title: book.title,
    authors: book.authors,
    cover_id: book.cover_id,
});

export const DownloadBook = ({ className, book, size = 'default' }) => {
    const [downloadState, setDownloadState] = useState(DownloadStates.UNINITIALIZED);
    const [, { add: addDownload }] = useDownloads();

    const handleRequest = async event => {
        event.preventDefault();
        await requestBookFile(book.filename);
        setDownloadState(DownloadStates.REQUESTED);
    };

    const handleDownload = async event => {
        event.preventDefault();
        setDownloadState(DownloadStates.DOWNLOADING);
        try {
            const blob = await downloadBookFile(book.filename);
            downloadBlob(blob, book.filename);
            addDownload(bookSnapshot(book));
            setDownloadState(DownloadStates.UNINITIALIZED);
        } catch (err) {
            setDownloadState(DownloadStates.REJECTED);
        }
    };

    useDelayedEffect(
        () => {
            if (downloadState === DownloadStates.REQUESTED) {
                const validateRequest = async () => {
                    const isValid = await validateBookFile(book.filename);
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
                    className={cn('bg-brand text-brand-foreground hover:bg-brand/90 font-noto', className)}
                    onClick={handleRequest}
                >
                    <DownloadCloud />
                    Descargar
                </Button>
            </TrackClick>
        ))
        .with({ state: DownloadStates.REQUESTED }, () => (
            <Button
                size={size}
                className={cn('bg-brand text-brand-foreground font-noto', className)}
                disabled
            >
                <Loader2 className='animate-spin' />
                Solicitando
            </Button>
        ))
        .with({ state: DownloadStates.AVAILABLE }, () => (
            <TrackClick className={cn(className)} name='book:download' data={{ book }}>
                <Button
                    size={size}
                    className={cn('bg-emerald-600 hover:bg-emerald-700 text-white font-noto', className)}
                    onClick={handleDownload}
                >
                    <Download />
                    Disponible
                </Button>
            </TrackClick>
        ))
        .with({ state: DownloadStates.DOWNLOADING }, () => (
            <Button
                size={size}
                className={cn('bg-emerald-600 text-white font-noto', className)}
                disabled
            >
                <Loader2 className='animate-spin' />
                Descargando
            </Button>
        ))
        .with({ state: DownloadStates.REJECTED }, () => (
            <Button
                size={size}
                variant='outline'
                className={cn('font-noto text-muted-foreground', className)}
                disabled
            >
                <Frown />
                No disponible
            </Button>
        ))
        .run();
};
