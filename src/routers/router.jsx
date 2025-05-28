import { Route, Switch } from 'wouter';

import { NotFound } from '@/modules/main/pages/not-found';
import { Home } from '@/modules/main/pages/home';

import { Book } from '@/modules/main/pages/book';
import { Author } from '@/modules/main/pages/author';
import { Serie } from '@/modules/main/pages/serie';

import { SearchBy } from '@/modules/main/pages/search-by';
import { Search } from '@/modules/main/pages/search';

export const Router = () => (
    <Switch>
        <Route path='/' component={Home} />

        <Route path='/book/:libid/:title?' component={Book} />
        <Route path='/author/:key' component={Author} />
        <Route path='/serie/:key' component={Serie} />

        <Route path='/search/:entity' component={SearchBy} />
        <Route path='/search' component={Search} />

        <Route component={NotFound} />
    </Switch>
);
