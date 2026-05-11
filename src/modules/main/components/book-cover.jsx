import { BookCoverFirebase } from './book-cover-firebase.jsx';
import { BookCoverTunnel } from './book-cover-tunnel.jsx';

const DEFAULT_VENDOR = process.env.NEXT_PUBLIC_COVER_VENDOR ?? 'tunnel';

const vendors = {
    firebase: BookCoverFirebase,
    tunnel: BookCoverTunnel,
};

export const BookCover = ({ vendor = DEFAULT_VENDOR, ...props }) => {
    const Component = vendors[vendor] ?? BookCoverTunnel;
    return <Component {...props} />;
};
