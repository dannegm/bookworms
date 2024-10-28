import { Button } from '@nextui-org/button';

import { cn } from '@/helpers/utils';
import { keyCase } from '@/helpers/strings';

import AuthorPreview from './author-preview';
import PlusRegular from '../icons/plus-regular';

export default function AuthorsList({
    className,
    title,
    authors = [],
    showRest = false,
    limit = undefined,
}) {
    const limitedAuthors = limit ? authors.slice(0, limit) : authors;
    const restAuthors = authors.length > limit ? authors.slice(limit) : [];

    return (
        <div className={cn(className)}>
            <h1 className='text-gray-500 font-bold text-medium mb-4'>{title}</h1>

            <div className={cn('flex flex-row flex-wrap gap-4')}>
                {limitedAuthors.map(author => (
                    <AuthorPreview
                        key={`primary-author-${keyCase(author.name)}`}
                        authorKey={keyCase(author.name)}
                    />
                ))}

                {showRest && (
                    <>
                        {restAuthors.map(author => (
                            <AuthorPreview
                                key={`rest-author-${keyCase(author.name)}`}
                                authorKey={keyCase(author.name)}
                            />
                        ))}
                    </>
                )}
            </div>

            {!showRest && (
                <div className='hidden mt-4'>
                    <Button radius='full' size='sm' startContent={<PlusRegular />}>
                        Ver todos los resultados
                    </Button>
                </div>
            )}
        </div>
    );
}
