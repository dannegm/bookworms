import { cn } from '@/helpers/utils';

export const Eyebrow = ({ children, className }) => (
    <p className={cn('text-[11px] uppercase tracking-widest text-brand font-noto', className)}>
        {children}
    </p>
);

export const SectionTitle = ({ children, className }) => (
    <h2 className={cn('font-merriweather font-normal text-[clamp(18px,4.5vw,24px)] leading-tight text-foreground', className)}>
        {children}
    </h2>
);

export const SectionDesc = ({ children, className }) => (
    <p className={cn('text-sm text-foreground/70 leading-relaxed font-noto', className)}>
        {children}
    </p>
);

export const PageInner = ({ children, className }) => (
    <div className={cn('w-main mx-auto px-5 py-8', className)}>
        {children}
    </div>
);

export const Divider = () => (
    <div className='border-t border-border' />
);

export const SearchBoxContainer = ({ children, className }) => (
    <div className='border-b border-border/75'>
        <div className={cn('w-main mx-auto px-5 py-4', className)}>
            {children}
        </div>
    </div>
);
