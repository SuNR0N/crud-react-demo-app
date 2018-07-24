import React, { SFC } from 'react';
import {
  Route,
  Switch,
} from 'react-router-dom';

import { RouteConfig } from '../../../config/RouteConfig';
import { CreateAuthorPageConnected } from './CreateAuthor';
import { EditAuthorPageConnected } from './EditAuthor';
import { ListAuthorsPageConnected } from './ListAuthors';
import { ViewAuthorPageConnected } from './ViewAuthor';

export const AuthorRoutes: SFC = () => (
  <Switch>
    <Route
      path={RouteConfig.editAuthor}
      component={EditAuthorPageConnected}
    />
    <Route
      path={RouteConfig.createAuthor}
      component={CreateAuthorPageConnected}
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