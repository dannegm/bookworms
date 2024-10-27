'use client';
import { useState } from 'react';

import { Button } from '@nextui-org/button';
import { Spinner } from '@nextui-org/spinner';

import { cn, downloadBlob } from '@/helpers/utils';
import useDelayedEffect from '@/hooks/use-delayed-effect';
import { downloadBookFile, requestBookFile, validateBookFile } from '@/services/bookworms';

import DownloadCloudRegular from '@/components/icons/download-cloud-regular';
import DownloadSimpleRegular from '@/components/icons/download-simple-regular';
import SmileySadRegular from '@/components/icons/smiley-sad-regular';

const DownloadStates = {
    UNINITIALIZED: 'UNINITIALIZED',
    REQUESTED: 'REQUESTED',
    AVAILABLE: 'AVAILABLE',
    DOWNLOADING: 'DOWNLOADING',
    REJECTED: 'REJECTED',
};

export default function DownloadBook({ className, book }) {
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
            <Button
                className={cn(className)}
                color='primary'
                size='lg'
                startContent={<DownloadCloudRegular />}
                onClick={handleRequest}
            >
                Solicitar libro
            </Button>
        ),
        [DownloadStates.REQUESTED]: (
            <Button
                className={cn(className)}
                color='primary'
                size='lg'
                spinner={<Spinner color='default' size='sm' />}
                isLoading
            >
                Solicitando libro
            </Button>
        ),
        [DownloadStates.AVAILABLE]: (
            <Button
                className={cn('text-white', className)}
                color='success'
                size='lg'
                startContent={<DownloadSimpleRegular />}
                onClick={handleDownload}
            >
                Descargar libro
            </Button>
        ),
        [DownloadStates.DOWNLOADING]: (
            <Button
                className={cn('text-white', className)}
                color='success'
                size='lg'
                spinner={<Spinner color='default' size='sm' />}
                isLoading
            >
                Descargando libro
            </Button>
        ),
        [DownloadStates.REJECTED]: (
            <Button
                className={cn(className)}
                color='danger'
                size='lg'
                startContent={<SmileySadRegular />}
            >
                Libro no disponible
            </Button>
        ),
    };

    return views[downloadState] || <></>;
}
