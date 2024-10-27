import { cn } from '@/helpers/utils';
import TagRegular from '@/components/icons/tag-regular';

export default function CategoryChip({ className, category }) {
    return (
        <div
            className={cn(
                'flex flex-row gap-1 items-center px-2 py-1 bg-purple-200 font-bold text-purple-900 text-xs rounded-md',
                className,
            )}
        >
            <TagRegular />
            {category}
        </div>
    );
}
