import { createRoot } from 'react-dom/client';
import { RouterProvider } from '@tanstack/react-router';

import { router } from './routers/router.jsx';
import './index.css';

createRoot(document.getElementById('root')).render(
    <RouterProvider router={router} />,
);
