import { cn } from '@/helpers/utils';

import Logo from '@/components/common/logo';
import SearchBar from './search-bar';

export default function Header({ className }) {
    return (
        <div className={cn('flex flex-col gap-2 mt-4', className)}>
            <Logo />
            <SearchBar />
        </div>
    );
}
