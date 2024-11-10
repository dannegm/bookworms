import { revalidatePath } from 'next/cache';
import { redirect, RedirectType } from 'next/navigation';

export async function GET(request) {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('query');

    if (!query) {
        return redirect('/');
    }

    revalidatePath('/search');
    return redirect(`/search?query=${query}`, RedirectType.push);
}
