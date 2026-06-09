import * as Lucide from 'lucide-react';
import { createLucideIcon } from 'lucide-react';
import * as LucideLab from '@lucide/lab';

import { cn } from '@/helpers/utils';
import { pascalCase } from '@/helpers/strings';
import { camelCase } from 'lodash';

// Cache wrapped lab icons to avoid creating new component types on every render
const labIconCache = new Map();

const resolveLabIcon = (name) => {
    if (labIconCache.has(name)) return labIconCache.get(name);
    const iconData = LucideLab[camelCase(name)];
    if (!iconData) return null;
    const Icon = createLucideIcon(pascalCase(name), iconData);
    labIconCache.set(name, Icon);
    return Icon;
};

// lucide-react exports PascalCase components; @lucide/lab exports camelCase raw icon data arrays
const resolvers = {
    lucide: (name) => Lucide[pascalCase(name)] ?? null,
    'lucide-lab': resolveLabIcon,
};

export const DynamicIcon = ({ library = 'lucide', name, className, ...props }) => {
    const resolve = resolvers[library] ?? resolvers.lucide;
    const Icon = resolve(name);

    if (!Icon)
        return (
            <Lucide.SquareDashed
                data-lib={library}
                data-name={name}
                data-name-case={pascalCase(name)}
                className={cn('size-5', className)}
                {...props}
            />
        );

    return <Icon data-lib={library} data-name={name} data-name-case={pascalCase(name)} className={cn('size-5', className)} {...props} />;
};
