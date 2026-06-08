import { Bug, BugOff } from 'lucide-react';
import { useSettings } from '@/hooks/use-settings';
import { Tooltip } from '@/ui/tooltip-simple';
import { ToggleIcon } from '@/ui/toggle-icon';

export const DebugModeToggle = () => {
    const [debug, setDebug] = useSettings('settings:debug', false);

    return (
        <Tooltip content='Toggle Debug Mode'>
            <ToggleIcon
                variant='ghost'
                pressed={debug}
                onPressedChange={setDebug}
                icons={{
                    on: <Bug />,
                    off: <BugOff />,
                }}
            />
        </Tooltip>
    );
};
