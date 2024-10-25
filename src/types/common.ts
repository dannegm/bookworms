import type { ReactNode } from 'react';

export interface ChildrenContainer {
    children: ReactNode;
}

export interface ElementProps {
    className?: string;
}

export interface PageProps {
    searchParams?: { [key: string]: string | string[] | undefined };
}
