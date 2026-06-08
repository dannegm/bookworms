import { Helmet } from 'react-helmet';
import { useParams, useNavigate } from '@tanstack/react-router';

import { getBook, getSerie } from '@/modules/core/services/bookworms';

import { Debugger } from '@/modules/core/components/debugger';
import { DataLoader } from '@/modules/core/components/data-loader';

import { Layout } from '@/modules/main/components/layout';
import { Section } from '@/modules/main/components/section';
import { SearchBox } from '@/modules/main/components/search-box';

import { BookDetails } from '@/modules/main/components/book-details';
import { BooksList } from '@/modules/main/components/books-list';
import { BooksListLoading } from '@/modules/main/components/books-list-loading';
import { BookDetailsLoading } from '@/modules/main/components/book-details-loading';

export const Book = () => {
    const { libid } = useParams({ strict: false });
    const navigate = useNavigate();

    return (
        <Layout>
            <SearchBox />

            <DataLoader
                query={getBook(libid)}
                tags={[`book`]}
                retry={0}
                onError={error => {
                    navigate({ to: '/404' });
                }}
                loader={
                    <Section className='flex flex-col gap-4'>
                        <BookDetailsLoading />
                    </Section>
                }
                preventRefetch
            >
                {({ data, error }) =>
                    data && (
                        <>
                            <Helmet>
                                <title>{data.title}</title>
                            </Helmet>

                            <Debugger name='book' data={data} />
                            {error && <Debugger name='error' data={error} />}

                            <Section className='flex flex-col gap-4'>
                                <BookDetails book={data} />
                            </Section>

                            {data.serie_name && (
                                <DataLoader
                                    query={getSerie(data.serie_name)}
                                    tags={[`serie`]}
                                    loader={
                                        <Section className='flex flex-col gap-8'>
                                            <BooksListLoading />
                                        </Section>
                                    }
                                    preventRefetch
                                >
                                    {({ data: serieData }) => (
                                        <Section className='flex flex-col gap-8'>
                                            <h2 className='font-bold'>
                                                Más libros que podrían interesarte
                                            </h2>
                                            <BooksList books={serieData?.books} />
                                        </Section>
                                    )}
                                </DataLoader>
                            )}
                        </>
                    )
                }
            </DataLoader>
        </Layout>
    );
};
