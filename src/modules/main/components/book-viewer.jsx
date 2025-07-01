import { useEffect, useRef, useState } from 'react';
import { useQueryState, parseAsBoolean } from 'nuqs';
import { ReactReader, ReactReaderStyle } from 'react-reader';
import {
    BookDashed,
    ChevronLeft,
    ChevronRight,
    Dot,
    Pointer,
    PointerOff,
    TableOfContentsIcon,
    X,
} from 'lucide-react';

import { cn } from '@/modules/core/helpers/utils';
import { useDelayedEffect } from '@/modules/core/hooks/use-delayed-effect';
import { useLocalStorage } from '@/modules/core/hooks/use-local-storage';
import { useDarkMode } from '@/modules/core/hooks/use-dark-mode';

import { getFileUrl, requestBookFile, validateBookFile } from '@/modules/core/services/bookworms';

import { DarkModeToggle } from '@/modules/core/components/dark-mode-toggle';

import { Button } from '@/modules/shadcn/ui/button';
import { ScrollArea } from '@/modules/shadcn/ui/scroll-area';
import { Loader } from '@/modules/core/components/loader';
import { Progress } from '@/modules/shadcn/ui/progress';
import { Separator } from '@/modules/shadcn/ui/separator';
import { ResponsivePopover } from '@/modules/shadcn/ui/responsive-popover';
import { ResponsiveDialog, ResponsiveDialogContent } from '@/modules/shadcn/ui/responsive-dialog';
import { Alert, AlertDescription, AlertTitle } from '@/modules/shadcn/ui/alert';
import { Tooltip } from '@/modules/shadcn/ui/tooltip-simple';

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
        display: 'none',
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
    reader: {
        ...ReactReaderStyle.reader,
        right: 0,
        left: 0,
        top: 0,
        bottom: 20,
    },
};

export const SwipeableButton = ({ swipeable, setSwipeable }) => {
    const [open, setOpen] = useState(false);
    return (
        <ResponsivePopover
            modal={true}
            open={open}
            onOpenChange={setOpen}
            classNames={{
                content: 'p-0 w-auto',
            }}
            props={{
                content: { side: 'bottom', align: 'end' },
            }}
            trigger={
                <Button size='icon' variant='ghost'>
                    {!swipeable ? <PointerOff /> : <Pointer />}
                </Button>
            }
        >
            <div className='flex flex-col p-2 gap-2'>
                <Button
                    className={cn('h-auto w-full flex flex-row gap-2 items-start justify-start', {
                        'bg-gray-200 dark:bg-gray-800': swipeable,
                    })}
                    variant={!swipeable ? 'ghost' : 'secondary'}
                    onClick={() => {
                        setSwipeable(true);
                        setOpen(false);
                    }}
                >
                    <Pointer />
                    <div className='w-full flex flex-col items-start overflow-hidden'>
                        <span>Cambiar de página deslizando el dedo</span>
                        <span className='text-xs text-muted-foreground'>
                            No se puede seleccionar texto en este modo.
                        </span>
                    </div>
                </Button>

                <Separator />

                <Button
                    className={cn('h-auto w-full flex flex-row gap-2 items-start justify-start', {
                        'bg-gray-200 dark:bg-gray-800': !swipeable,
                    })}
                    variant={swipeable ? 'ghost' : 'secondary'}
                    onClick={() => {
                        setSwipeable(false);
                        setOpen(false);
                    }}
                >
                    <PointerOff />
                    <div className='w-full flex flex-col items-start overflow-hidden'>
                        <span>Activar selección de texto</span>
                        <span className='text-xs text-muted-foreground'>
                            Presiona los laterales para cambiar de página
                        </span>
                    </div>
                </Button>
            </div>
        </ResponsivePopover>
    );
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
            modal={true}
            onOpenChange={setOpen}
            classNames={{
                content: 'p-0',
            }}
            props={{
                content: { side: 'bottom', align: 'start' },
            }}
            trigger={
                <Tooltip content='Tabla de contenidos' align='start'>
                    <Button size='icon' variant='ghost' onClick={() => setOpen(!open)}>
                        <TableOfContentsIcon />
                    </Button>
                </Tooltip>
            }
        >
            <ScrollArea className='h-[40svh]'>
                <div className='flex flex-col gap-1 py-4'>
                    <h2 className='px-4 text-sm font-bold uppercase'>Tabla de contenidos</h2>
                    {toc.map(item => (
                        <Button
                            key={item.id}
                            variant='ghost'
                            className='w-full justify-start text-left line-clamp-1'
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

    const [chapter, setChapter] = useLocalStorage(`book:viewer:${book.id}:chapter`, '');
    const [chapterPage, setChapterPage] = useLocalStorage(`book:viewer:${book.id}:chapterPage`, 0);
    const [chapterTotalPages, setChapterTotalPages] = useLocalStorage(
        `book:viewer:${book.id}:chapterTotalPages`,
        0,
    );

    const [swipeable, setSwipeable] = useLocalStorage(`book:viewer:${book.id}:swipeable`, false);

    const handleLocChange = async loc => {
        setLocation(loc);

        if (!$rendition.current || !toc) return;

        const { displayed, href, cfi } = $rendition.current.location.start;
        const chapter = toc.find(item => item.href === href);
        const sanitized = sanitizeLabel(chapter?.label) || null;

        setChapterPage(displayed.page);
        setChapterTotalPages(displayed.total);
        setChapter(sanitized);
    };

    const handleTocChange = toc => {
        setToc(toc);
    };

    const handleNext = () => {
        $rendition.current?.next();
    };

    const handlePrev = () => {
        $rendition.current?.prev();
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
    }, [theme, $rendition.current]);

    return (
        <div className='relative flex flex-col gap-0 sm:gap-4 h-full'>
            <div className='flex flex-row items-center justify-between mt-4 sm:mt-0 pb-2 sm:pb-0'>
                <div className='flex flex-row items-center gap-1'>
                    <TableOfContents toc={toc} onSelect={({ href }) => handleLocChange(href)} />

                    <Tooltip content={book.title} align='start'>
                        <h1 className='text-lg font-bold line-clamp-1'>{book.title}</h1>
                    </Tooltip>

                    {chapter && (
                        <>
                            <Dot className='hidden sm:block text-md' />
                            <h2 className='hidden sm:block text-md'>{chapter}</h2>
                        </>
                    )}
                </div>

                <div className='flex flex-row gap-2'>
                    <SwipeableButton swipeable={swipeable} setSwipeable={setSwipeable} />

                    <DarkModeToggle className='bg-transparent dark:bg-transparent' />

                    <Button size='icon' variant='ghost' onClick={() => onOpenChange?.(false)}>
                        <X />
                    </Button>
                </div>
            </div>

            <div className='absolute z-max bottom-4 left-1/2 -translate-x-1/2 text-xs'>
                Página {chapterPage} de {chapterTotalPages}
            </div>

            {!swipeable && (
                <>
                    <div
                        data-layer='prev'
                        className={cn(
                            'absolute z-max top-16 sm:top-12 bottom-0 left-0 h-[calc(100%-4rem)] w-16 select-none cursor-pointer',
                        )}
                        onClick={handlePrev}
                    >
                        <div className='absolute w-full h-[80%] top-1/2 -translate-y-1/2 flex-center rounded-2xl bg-neutral-100/60 dark:bg-neutral-900/60 backdrop-blur-sm animate-blink-out delay-300'>
                            <ChevronLeft className='block xl:hidden' />
                        </div>
                        <div className='hidden xl:flex absolute w-full h-full flex-center'>
                            <ChevronLeft />
                        </div>
                    </div>

                    <div
                        data-layer='next'
                        className={cn(
                            'absolute z-max top-16 sm:top-12 bottom-0 right-0 h-[calc(100%-4rem)] w-16 select-none cursor-pointer',
                        )}
                        onClick={handleNext}
                    >
                        <div className='absolute w-full h-[80%] top-1/2 -translate-y-1/2 flex-center rounded-2xl bg-neutral-100/60 dark:bg-neutral-900/60 backdrop-blur-sm animate-blink-out delay-300'>
                            <ChevronRight className='block xl:hidden' />
                        </div>
                        <div className='hidden xl:flex absolute w-full h-full flex-center'>
                            <ChevronRight />
                        </div>
                    </div>
                </>
            )}

            <div className='relative w-full h-full'>
                <ReactReader
                    url={filename}
                    location={location}
                    locationChanged={handleLocChange}
                    tocChanged={handleTocChange}
                    showToc={false}
                    getRendition={rendition => ($rendition.current = rendition)}
                    readerStyles={readerDefaultStyles}
                    swipeable={swipeable}
                />
            </div>

            <div className='absolute z-max bottom-0 left-0 right-0'>
                <Progress className='h-1' value={chapterPage} max={chapterTotalPages} />
            </div>
        </div>
    );
};

export const BookViewer = ({ className, book }) => {
    const [open, setOpen] = useQueryState('viewer', parseAsBoolean.withDefault(false));

    const [downloadState, setDownloadState] = useState(DownloadStates.UNINITIALIZED);
    const [cachedUrl, setCachedUrl] = useLocalStorage(`book:viewer:${book.id}:url`, '');

    const [filename, setFilename] = useState();

    const handleRequest = async () => {
        setDownloadState(DownloadStates.LOADING);
        await requestBookFile(book.filename);
        setDownloadState(DownloadStates.REQUESTED);
    };

    const handleFirstLoad = async filename => {
        const isValid = await validateBookFile(filename);

        if (!isValid) {
            setDownloadState(DownloadStates.READY);
            setFilename(cachedUrl);
        } else {
            handleRequest();
        }
    };

    const handleLoad = async () => {
        try {
            const publicUrl = await getFileUrl(book.filename);
            setCachedUrl(publicUrl);
            setFilename(publicUrl);
            setDownloadState(DownloadStates.READY);
        } catch (err) {
            setDownloadState(DownloadStates.REJECTED);
        }
    };

    useEffect(() => {
        if (!cachedUrl) {
            handleRequest();
        } else {
            handleFirstLoad();
        }
    }, []);

    useDelayedEffect(
        () => {
            if (downloadState === DownloadStates.REQUESTED) {
                const validateRequest = async () => {
                    const isValid = await validateBookFile(book.filename);
                    setDownloadState(isValid ? DownloadStates.AVAILABLE : DownloadStates.REJECTED);

                    if (isValid) {
                        await handleLoad();
                    }
                };
                validateRequest();
            }
        },
        [downloadState],
        3 * 1000,
    );

    return (
        <div className={cn(className)}>
            <ResponsiveDialog open={open} onOpenChange={setOpen}>
                <ResponsiveDialogContent
                    title={book?.title || 'Book Viewer'}
                    className={cn(
                        'sm:max-w-[calc(100%-2rem)] p-2 pt-0 sm:pt-2 h-[90svh] overflow-hidden',
                        {
                            'h-auto pb-32 sm:pb-2': downloadState === DownloadStates.REJECTED,
                        },
                    )}
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
