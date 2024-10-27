'use client';
import { createContext, useContext } from 'react';

const EnviromentContext = createContext({});

export const useEnviroment = () => {
    return useContext(EnviromentContext);
};

export default function EnviromentProvider({ data = {}, children }) {
    return <EnviromentContext.Provider value={data}>{children}</EnviromentContext.Provider>;
}
