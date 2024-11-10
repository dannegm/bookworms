'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Pagination as NextUIPagination } from '@nextui-org/pagination';
import { cn } from '@/helpers/utils';

export default function Pagination({ className, total = 1 }) {
    const pathname = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();

    const page = searchParams.get('page') || 1;

    const handleChange = selectedPage => {
        const newSearchParams = new URLSearchParams(searchParams.toString());
        newSearchParams.set('page', selectedPage);
        router.push(`${pathname}?${newSearchParams.toString()}`);
    };

    if (total <= 1) {
        return <></>;
    }

    return (
        <div className={cn(className)}>
            <NextUIPagination total={total} initialPage={page} onChange={handleChange} />
        </div>
    );
}
