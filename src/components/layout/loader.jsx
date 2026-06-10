import { PuffLoader } from 'react-spinners';

export const Loader = () => (
    <div className='fixed z-max inset-0 flex items-center justify-center bg-background'>
        <PuffLoader color='var(--brand)' />
    </div>
);
