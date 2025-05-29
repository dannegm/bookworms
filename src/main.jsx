import { createRoot } from 'react-dom/client';
import { Providers } from '@/modules/core/providers/providers';

import './index.css';

import { Router } from './routers/router.jsx';

createRoot(document.getElementById('root')).render(
    <Providers>
        <Router />
    </Providers>,
);
