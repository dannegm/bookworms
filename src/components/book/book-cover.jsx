import { BookCoverFirebase } from '@/components/book/book-cover-firebase';
import { BookCoverTunnel } from '@/components/book/book-cover-tunnel';

const DEFAULT_VENDOR = import.meta.env.NEXT_PUBLIC_COVER_VENDOR ?? 'tunnel';

const vendors = {
    firebase: BookCoverFirebase,
    tunnel: BookCoverTunnel,
};

export const BookCover = ({ vendor = DEFAULT_VENDOR, ...props }) => {
    const Component = vendors[vendor] ?? BookCoverTunnel;
    return <Component {...props} />;
};
