'use client';
import { cn } from '@/helpers/utils';

import dynamic from 'next/dynamic';

const ReactJson = dynamic(() => import('react-json-view'), { ssr: false });

const REACT_JSON_THEME = 'ocean';
const REACT_JSON_STYLES = {
    backgroundColor: 'rgb(15, 23, 42)',
    fontSize: '0.778rem',
};

export default function JsonViewer({ className, name = 'root', data = {}, expanded }) {
    return (
        <div className={cn('block max-w-full p-4 pb-3 bg-slate-900', className)}>
            <ReactJson
                name={name}
                src={data}
                theme={REACT_JSON_THEME}
                style={REACT_JSON_STYLES}
                collapsed={!expanded}
            />
        </div>
    );
}
