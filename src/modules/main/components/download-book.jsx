import { TrackClick } from '@/modules/core/components/track-click';
import { cn, downloadBlob } from '@/modules/core/helpers/utils';
import { useDelayedEffect } from '@/modules/core/hooks/use-delayed-effect';
import {
    downloadBookFile,
    requestBookFile,
    validateBookFile,
} from '@/modules/core/services/bookworms';
import { Button } from '@/modules/shadcn/ui/button';
import { Download, DownloadCloud, Frown, Loader2 } from 'lucide-react';
import { useState } from 'react';

const DownloadStates = {
    UNINITIALIZED: 'UNINITIALIZED',
    REQUESTED: 'REQUESTED',
    AVAILABLE: 'AVAILABLE',
    DOWNLOADING: 'DOWNLOADING',
    REJECTED: 'REJECTED',
};

export const DownloadBook = ({ className, book, size = 'default' }) => {
    const [downloadState, setDownloadState] = useState(DownloadStates.UNINITIALIZED);

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

    const views = {
        [DownloadStates.UNINITIALIZED]: (
            <TrackClick name='book:request' data={{ book }}>
                <Button
                    size={size}
                    className={cn('bg-blue-400 hover:bg-blue-500 text-white', className)}
                    onClick={handleRequest}
                >
                    <DownloadCloud />
                    Solicitar
                </Button>
            </TrackClick>
        ),
        [DownloadStates.REQUESTED]: (
            <Button
                size={size}
                className={cn('bg-blue-400 hover:bg-blue-500 text-white', className)}
                disabled
            >
                <Loader2 className='animate-spin' />
                Solicitando
            </Button>
        ),
        [DownloadStates.AVAILABLE]: (
            <TrackClick name='book:download' data={{ book }}>
                <Button
                    size={size}
                    className={cn('bg-green-400 hover:bg-green-500 text-white', className)}
                    onClick={handleDownload}
                >
                    <Download />
                    Descargar
                </Button>
            </TrackClick>
        ),
        [DownloadStates.DOWNLOADING]: (
            <Button
                size={size}
                className={cn('bg-green-400 hover:bg-green-500 text-white', className)}
                disabled
            >
                <Loader2 className='animate-spin' />
                Descargando
            </Button>
        ),
        [DownloadStates.REJECTED]: (
            <Button
                size={size}
                className={cn('bg-red-400 hover:bg-red-500 text-white', className)}
                disabled
            >
                <Frown />
                No disponible
            </Button>
        ),
    };

    return views[downloadState] || <></>;
};
