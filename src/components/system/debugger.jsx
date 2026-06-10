import { cn } from '@/helpers/utils';
import { useSettings } from '@/hooks/use-settings';

import { JsonViewer } from '@/components/system/json-viewer';
import { PageInner } from '@/components/layout/primitives';

export const Debugger = ({ className, name = 'root', data = {}, simple = false, expanded }) => {
    const [debug] = useSettings('settings:debug', false);

    if (!debug) return null;

    if (simple) {
        return (
            <div className={cn(className)}>
                <JsonViewer name={name} data={data} expanded={expanded} />
            </div>
        );
    }

    return (
        <PageInner className={cn(className)}>
            <JsonViewer name={name} data={data} expanded={expanded} />
        </PageInner>
    );
};
