'use client';
import { createContext, useContext } from 'react';

const EnviromenteeeeeeeContext = createContext({
    // Your payload
});

export const useEnviromenteeeeeee = () => {
    return useContext(EnviromenteeeeeeeContext);
};

export default function EnviromenteeeeeeeProvider({ children }) {
    return (
        <EnviromenteeeeeeeContext.Provider value={{
            // Your payload
        }}>
            {children}
        </EnviromenteeeeeeeContext.Provider>
    );
}
