'use client';
import type { ChildrenContainer } from '@/types/common';
import type { EnvironmentInfo } from '@/helpers/environment';
import { createContext, useContext } from 'react';

export interface EnviromentProps extends ChildrenContainer {
    data?: EnvironmentInfo;
}

const EnviromentContext = createContext<EnvironmentInfo>({});

export const useEnviroment = () => {
    return useContext(EnviromentContext);
};

export default function EnviromentProvider({ data = {}, children }: EnviromentProps) {
    return <EnviromentContext.Provider value={data}>{children}</EnviromentContext.Provider>;
}
