import { Moon, Sun } from 'lucide-react';
import { useDarkMode } from '@/hooks/use-dark-mode';

import { Tooltip } from '@/ui/tooltip-simple';
import { ToggleIcon } from '@/ui/toggle-icon';

export const DarkModeToggle = ({ className }) => {
    const [theme, toggle] = useDarkMode();

    return (
        <Tooltip content='Toggle Dark Mode'>
            <ToggleIcon
                className={className}
                variant='ghost'
                pressed={theme === 'dark'}
                onPressedChange={toggle}
                icons={{
                    off: <Sun />,
                    on: <Moon />,
                }}
            />
        </Tooltip>
    );
};
