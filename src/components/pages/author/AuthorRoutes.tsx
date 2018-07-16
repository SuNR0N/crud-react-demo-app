import * as React from 'react';
import {
  Route,
  Switch,
} from 'react-router-dom';

import { RouteConfig } from '../../../config/RouteConfig';
import { CreateAuthorPage } from './CreateAuthor';
import { EditAuthorPage } from './EditAuthor';
import { ListAuthorsPageConnected } from './ListAuthors';
import { ViewAuthorPageConnected } from './ViewAuthor';

export const AuthorRoutes: React.SFC = () => (
  <Switch>
    <Route
      path={RouteConfig.editAuthor}
      component={EditAuthorPage}
    />
    <Route
      path={RouteConfig.createAuthor}
      component={CreateAuthorPage}
    />
    <Route
      path={RouteConfig.viewAuthor}
      component={ViewAuthorPageConnected}
    />
    <Route
      path={RouteConfig.authors}
      component={ListAuthorsPageConnected}
    />
  </Switch>
)