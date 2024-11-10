import { cn } from '@/helpers/utils';

import Header from '@/components/common/header';
import Summaries from '@/components/common/summaries';

export default async function Home() {
    return (
        <main
            className={cn(
                'mx-4 mb-12 min-h-screen flex flex-col justify-center gap-2',
                'xl:w-[1000px] xl:mx-auto',
            )}
        >
            <Header className='-mt-32' />
            <Summaries />
        </main>
    );
}
