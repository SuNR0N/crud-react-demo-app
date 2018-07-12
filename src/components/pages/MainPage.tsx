import * as React from 'react';
import {
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

import { RouteConfig } from '../../config/RouteConfig';
import { NavigationBar } from '../common/NavigationBar/NavigationBar';
import { AuthorRoutes } from './author';
import { BookRoutes } from './book';
import { CategoryRoutes } from './category';
import { PublisherRoutes } from './publisher';

export const MainPage: React.SFC = () => (
  <main>
    <NavigationBar/>
    <Switch>
      <Redirect
        from={RouteConfig.root}
        exact={true}
        to={RouteConfig.books}
      />
      <Route
        path={RouteConfig.authors}
        component={AuthorRoutes}
      />
      <Route
        path={RouteConfig.books}
        component={BookRoutes}
      />
      <Route
        path={RouteConfig.categories}
        component={CategoryRoutes}
      />
      <Route
        path={RouteConfig.publishers}
        component={PublisherRoutes}
      />
    </Switch>
  </main>
)
