import { cn } from '@/helpers/utils';
import { useDocumentClassNames } from '@/hooks/use-document-class-names';
import { useDarkMode } from '@/hooks/use-dark-mode';

export const DarkModeProvider = ({ children }) => {
    const [theme] = useDarkMode();

    useDocumentClassNames({
        body: cn(theme),
    });

    return <>{children}</>;
};
