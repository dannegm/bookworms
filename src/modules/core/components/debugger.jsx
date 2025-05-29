import { cn } from '@/modules/core/helpers/utils';
import { useSettings } from '@/modules/core/hooks/use-settings';

import { JsonViewer } from '@/modules/core/components/json-viewer';
import { Section } from '@/modules/main/components/section';

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
        <Section className={cn(className)}>
            <JsonViewer name={name} data={data} expanded={expanded} />
        </Section>
    );
};
