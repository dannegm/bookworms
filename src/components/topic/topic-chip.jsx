import { DynamicIcon } from '@/components/system/dynamic-icon';
import { keyCase } from '@/helpers/strings';

export const TopicChipSkeleton = () => (
    <div className='bg-card border border-border rounded-[10px] p-3.5 animate-pulse'>
        <div className='size-7 rounded bg-muted mb-2' />
        <div className='h-3 bg-muted rounded w-3/4 mb-1.5' />
        <div className='h-3 bg-muted rounded w-1/2' />
    </div>
);

export const TopicChip = ({ topic }) => (
    <a
        href={`/topic/${topic.id}/${keyCase(topic.hint)}`}
        className='bg-card border border-border rounded-[10px] p-3.5 hover:border-brand transition-colors duration-150 block'
    >
        <div className='text-brand mb-2'>
            <DynamicIcon library={topic.icon?.library} name={topic.icon?.name} className='size-7 stroke-1' />
        </div>
        <div className='text-xs font-medium text-foreground font-noto'>{topic.hint}</div>
        <div className='text-[11px] text-muted-foreground mt-0.5 font-noto'>{topic.topic}</div>
    </a>
);
