'use client';

import { cn } from '@/modules/core/helpers/utils';
import { useDocumentClassNames } from '@/modules/core/hooks/use-document-class-names';
import { useDarkMode } from '@/modules/core/hooks/use-dark-mode';

export const DarkModeProvider = ({ children }) => {
    const [theme] = useDarkMode();

    useDocumentClassNames({
        body: cn(theme),
    });

    return <>{children}</>;
};
