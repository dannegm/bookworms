import { useEffect, useRef, useState } from 'react';
import { useQueryState, parseAsBoolean } from 'nuqs';
import { ReactReader, ReactReaderStyle } from 'react-reader';
import { BookDashed, Dot, TableOfContentsIcon, X } from 'lucide-react';

import { cn } from '@/modules/core/helpers/utils';
import { useDelayedEffect } from '@/modules/core/hooks/use-delayed-effect';
import { useLocalStorage } from '@/modules/core/hooks/use-local-storage';

import { getFileUrl, requestBookFile, validateBookFile } from '@/modules/core/services/bookworms';

import { Button } from '@/modules/shadcn/ui/button';
import { ScrollArea } from '@/modules/shadcn/ui/scroll-area';
import { ResponsivePopover } from '@/modules/shadcn/ui/responsive-popover';
import { ResponsiveDialog, ResponsiveDialogContent } from '@/modules/shadcn/ui/responsive-dialog';
import { useDarkMode } from '@/modules/core/hooks/use-dark-mode';
import { Loader } from '@/modules/core/components/loader';
import { Alert, AlertDescription, AlertTitle } from '@/modules/shadcn/ui/alert';

const DownloadStates = {
    UNINITIALIZED: 'UNINITIALIZED',
    REQUESTED: 'REQUESTED',
    AVAILABLE: 'AVAILABLE',
    LOADING: 'LOADING',
    REJECTED: 'REJECTED',
    READY: 'READY',
};

const sanitizeLabel = (label = '') => {
    return label.replace(/\n/g, '').trim();
};

const readerDefaultStyles = {
    ...ReactReaderStyle,
    arrow: {
        ...ReactReaderStyle.arrow,
        color: 'var(--foreground)',
    },
    arrowHover: {
        ...ReactReaderStyle.arrowHover,
        color: 'var(--foreground)',
    },
    readerArea: {
        ...ReactReaderStyle.readerArea,
        backgroundColor: 'var(--background)',
    },
    titleArea: {
        ...ReactReaderStyle.titleArea,
        color: 'var(--foreground)',
    },
};

export const TableOfContents = ({ toc, onSelect }) => {
    const [open, setOpen] = useState(false);

    const handleSelect = item => {
        setOpen(false);
        onSelect?.(item);
    };

    return (
        <ResponsivePopover
            open={open}
            onOpenChange={setOpen}
            classNames={{
                content: 'p-0',
            }}
            props={{
                content: { side: 'bottom', align: 'start' },
            }}
            trigger={
                <Button size='icon' variant='ghost'>
                    <TableOfContentsIcon />
                </Button>
            }
        >
            <ScrollArea className='h-[40svh]'>
                <div className='flex flex-col gap-1 py-4'>
                    <h2 className='px-4 text-sm font-bold uppercase'>Tabla de contenidos</h2>
                    {toc.map(item => (
                        <Button
                            key={item.id}
                            variant='ghost'
                            className='w-full justify-start text-left'
                            onClick={() => handleSelect(item)}
                        >
                            {sanitizeLabel(item.label)}
                        </Button>
                    ))}
                </div>
            </ScrollArea>
        </ResponsivePopover>
    );
};

export const Viewer = ({ book, filename, onOpenChange }) => {
    const [theme] = useDarkMode();

    const $rendition = useRef();

    const [toc, setToc] = useState([]);

    const [location, setLocation] = useLocalStorage(`book:viewer:${book.id}:location`, 0);
    const [page, setPage] = useLocalStorage(`book:viewer:${book.id}:page`, 0);
    const [totalPages, setTotalPages] = useLocalStorage(`book:viewer:${book.id}:totalPages`, 0);
    const [chapter, setChapter] = useLocalStorage(`book:viewer:${book.id}:chapter`, '');

    const handleLocChange = loc => {
        setLocation(loc);

        if ($rendition.current && toc) {
            const { displayed, href } = $rendition.current.location.start;
            const chapter = toc.find(item => item.href === href);

            setPage(displayed.page);
            setTotalPages(displayed.total);
            setChapter(sanitizeLabel(chapter?.label) || null);
        }
    };

    const handleTocChange = toc => {
        setToc(toc);
    };

    useEffect(() => {
        if ($rendition.current) {
            const themes = $rendition.current.themes;

            if (theme === 'dark') {
                themes.override('color', '#fff');
            } else {
                themes.override('color', '#000');
            }
        }
    }, [theme]);

    return (
        <div className='relative flex flex-col gap-0 sm:gap-4 h-full'>
            <div className='flex flex-row items-center justify-between mt-4 sm:mt-0 border-b border-neutral-200 dark:border-neutral-700 pb-2 sm:pb-0'>
                <div className='flex flex-row items-center gap-1'>
                    <TableOfContents toc={toc} onSelect={({ href }) => handleLocChange(href)} />
                    <h1 className='text-lg font-bold'>{book.title}</h1>
                    {chapter && (
                        <>
                            <Dot className='hidden sm:block text-md' />
                            <h2 className='hidden sm:block text-md'>{chapter}</h2>
                        </>
                    )}
                </div>

                <div className='hidden sm:flex flex-row'>
                    <Button size='icon' variant='ghost' onClick={() => onOpenChange?.(false)}>
                        <X />
                    </Button>
                </div>
            </div>

            <div className='absolute z-max bottom-4 left-1/2 -translate-x-1/2 text-sm'>
                Página {page} de {totalPages}
            </div>

            <div className='relative w-full h-full pb-6'>
                <ReactReader
                    url={filename}
                    location={location}
                    locationChanged={handleLocChange}
                    tocChanged={handleTocChange}
                    showToc={false}
                    getRendition={rendition => ($rendition.current = rendition)}
                    readerStyles={readerDefaultStyles}
                    swipeable
                />
            </div>
        </div>
    );
};

export const BookViewer = ({ className, book }) => {
    const [open, setOpen] = useQueryState('viewer', parseAsBoolean.withDefault(false));

    const [downloadState, setDownloadState] = useState(DownloadStates.UNINITIALIZED);

    const [filename, setFilename] = useState();

    const handleRequest = async () => {
        setDownloadState(DownloadStates.LOADING);
        await requestBookFile(book.filename);
        setDownloadState(DownloadStates.REQUESTED);
    };

    const handleLoad = async () => {
        try {
            const publicUrl = await getFileUrl(book.filename);
            setFilename(publicUrl);
            setDownloadState(DownloadStates.READY);
        } catch (err) {
            setDownloadState(DownloadStates.REJECTED);
        }
    };

    useEffect(() => {
        handleRequest();
    }, []);

    useDelayedEffect(
        () => {
            if (downloadState === DownloadStates.REQUESTED) {
                const validateRequest = async () => {
                    const isValid = await validateBookFile(book.filename);
                    setDownloadState(isValid ? DownloadStates.AVAILABLE : DownloadStates.REJECTED);
                    await handleLoad();
                };
                validateRequest();
            }
        },
        [downloadState],
        100,
    );

    return (
        <div className={cn(className)}>
            <ResponsiveDialog open={open} onOpenChange={setOpen}>
                <ResponsiveDialogContent
                    className={cn('sm:max-w-[calc(100%-2rem)] p-2 h-[90svh] overflow-hidden', {
                        'h-auto pb-32 sm:pb-2': downloadState === DownloadStates.REJECTED,
                    })}
                    showCloseButton={false}
                >
                    {(downloadState === DownloadStates.REQUESTED ||
                        downloadState === DownloadStates.LOADING) && <Loader />}

                    {downloadState === DownloadStates.REJECTED && (
                        <Alert variant='destructive'>
                            <BookDashed />
                            <AlertTitle>Ups! Algo salió mal.</AlertTitle>
                            <AlertDescription>
                                No fue posible descargar el libro para su visualización. Por favor,
                                inténtalo de nuevo más tarde.
                            </AlertDescription>
                        </Alert>
                    )}

                    {downloadState === DownloadStates.READY && (
                        <Viewer book={book} filename={filename} onOpenChange={setOpen} />
                    )}
                </ResponsiveDialogContent>
            </ResponsiveDialog>
        </div>
    );
};
