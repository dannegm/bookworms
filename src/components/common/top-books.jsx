import { cn } from '@/helpers/utils';
import { getTop } from '@/services/bookworms';
import BooksList from './books-list';

export default async function TopBooks({ className }) {
    const results = await getTop('books', 'views');
    return <BooksList className={cn(className)} title='Top 10 Libros' books={results} limit={10} />;
}
