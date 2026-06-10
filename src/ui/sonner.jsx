import { Toaster as Sonner } from 'sonner';
import { useDarkMode } from '@/hooks/use-dark-mode';

const Toaster = ({ ...props }) => {
    const [theme] = useDarkMode();

    return (
        <Sonner
            theme={theme ?? 'system'}
            className='toaster group'
            style={{
                '--normal-bg': 'var(--popover)',
                '--normal-text': 'var(--popover-foreground)',
                '--normal-border': 'var(--border)',
            }}
            {...props}
        />
    );
};

export { Toaster };
