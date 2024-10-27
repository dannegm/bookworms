'use client';

import { useQueryState } from 'nuqs';
import { useHotkeys } from 'react-hotkeys-hook';

import { cn } from '@/helpers/utils';
import { useEnviroment } from '@/providers/enviroment-provider';

import JsonViewer from './json-viewer';
import { useEffect } from 'react';

export default function Debugger({ className }) {
    const [debug, setDebug] = useQueryState('debug');
    const [showLines, setShowlines] = useQueryState('showlines');
    const $debug = debug !== null;

    const environmentInfo = useEnviroment();

    useHotkeys(['mod+shift+d'], () => setDebug(() => (debug !== null ? null : 'true')), {
        preventDefault: true,
    });

    useEffect(() => {
        if (debug) {
            if (showLines) {
                document.body.classList.add('debug');
            } else {
                document.body.classList.remove('debug');
            }
        } else {
            document.body.classList.remove('debug');
        }

        return () => {
            document.body.classList.remove('debug');
        };
    }, [debug, showLines]);

    if (!$debug) {
        return <></>;
    }

    return (
        <div
            className={cn(
                'debugger outline-none childs:outline-none',
                'fixed z-max right-2 bottom-2 left-2 sm:left-auto rounded-md overflow-hidden bg-[#0f172a] shadow-xl',
                className,
            )}
        >
            <div className='flex flex-row justify-between items-center px-4 py-2 font-mono text-sm text-white'>
                <label htmlFor='show-lines'>Show lines</label>
                <input
                    className='w-4 h-4'
                    name='show-lines'
                    type='checkbox'
                    checked={showLines !== null}
                    onChange={e => {
                        setShowlines(e.target.checked ? 'true' : null);
                    }}
                />
            </div>
            <JsonViewer name='enviroment' data={environmentInfo} />
        </div>
    );
}
