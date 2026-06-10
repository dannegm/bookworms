import { useEffect } from 'react';
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
import { Explore } from '@/pages/explore';
import { Collection } from '@/pages/collection';
import { Topic } from '@/pages/topic';
import { About } from '@/pages/about';
import { Activity } from '@/pages/activity';

const redirect = ({ to }) => () => {
    useEffect(() => {
        window.location.replace(to);
    }, []);
    return null;
};

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
const exploreRoute = createRoute({ getParentRoute: () => rootRoute, path: '/explore', component: Explore });
const collectionRoute = createRoute({ getParentRoute: () => rootRoute, path: '/collection/$id', component: Collection });
const collectionWithHeadlineRoute = createRoute({ getParentRoute: () => rootRoute, path: '/collection/$id/$headline', component: Collection });
const topicRoute = createRoute({ getParentRoute: () => rootRoute, path: '/topic/$id', component: Topic });
const topicWithHintRoute = createRoute({ getParentRoute: () => rootRoute, path: '/topic/$id/$hint', component: Topic });
const aboutRoute = createRoute({ getParentRoute: () => rootRoute, path: '/about', component: About });
const activityRoute = createRoute({ getParentRoute: () => rootRoute, path: '/activity', component: Activity });
const issuesRoute = createRoute({ getParentRoute: () => rootRoute, path: '/issues', component: redirect({ to: 'https://github.com/dannegm/bookworms/issues' }) });
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
        exploreRoute,
        collectionRoute,
        collectionWithHeadlineRoute,
        topicRoute,
        topicWithHintRoute,
        aboutRoute,
        activityRoute,
        issuesRoute,
        notFoundRoute,
    ]),
});
