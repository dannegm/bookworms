import { Moon, Sun } from 'lucide-react';
import { useDarkMode } from '@/modules/core/hooks/use-dark-mode';

import { Tooltip } from '@/modules/shadcn/ui/tooltip-simple';
import { ToggleIcon } from '@/modules/shadcn/ui/toggle-icon';

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
