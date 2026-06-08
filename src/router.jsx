import { createRootRoute, createRoute, createRouter, Outlet } from '@tanstack/react-router';

import { Providers } from '@/providers/providers';

import { NotFound } from '@/pages/not-found';
import { Home } from '@/pages/home';
import { Book } from '@/pages/book';
import { Author } from '@/pages/author';
import { Serie } from '@/pages/serie';
import { SearchBy } from '@/pages/search-by';
import { Search } from '@/pages/search';
import { Category } from '@/pages/category';

const rootRoute = createRootRoute({
    component: () => (
        <Providers>
            <Outlet />
        </Providers>
    ),
    notFoundComponent: NotFound,
});

const homeRoute = createRoute({ getParentRoute: () => rootRoute, path: '/', component: Home });
const bookRoute = createRoute({ getParentRoute: () => rootRoute, path: '/book/$libid', component: Book });
const bookWithTitleRoute = createRoute({ getParentRoute: () => rootRoute, path: '/book/$libid/$title', component: Book });
const authorRoute = createRoute({ getParentRoute: () => rootRoute, path: '/author/$key', component: Author });
const serieRoute = createRoute({ getParentRoute: () => rootRoute, path: '/serie/$key', component: Serie });
const categoryRoute = createRoute({ getParentRoute: () => rootRoute, path: '/category/$key', component: Category });
const searchByRoute = createRoute({ getParentRoute: () => rootRoute, path: '/search/$entity', component: SearchBy });
const searchRoute = createRoute({ getParentRoute: () => rootRoute, path: '/search', component: Search });
const notFoundRoute = createRoute({ getParentRoute: () => rootRoute, path: '/404', component: NotFound });

export const router = createRouter({
    routeTree: rootRoute.addChildren([
        homeRoute,
        bookRoute,
        bookWithTitleRoute,
        authorRoute,
        serieRoute,
        categoryRoute,
        searchByRoute,
        searchRoute,
        notFoundRoute,
    ]),
});
