import React, { SFC } from 'react';
import {
  Route,
  Switch,
} from 'react-router-dom';

import { RouteConfig } from '../../../config/RouteConfig';
import { CreateBookPageConnected } from './CreateBook';
import { EditBookPageConnected } from './EditBook';
import { ListBooksPageConnected } from './ListBooks';
import { ViewBookPageConnected } from './ViewBook';

export const BookRoutes: SFC = () => (
  <Switch>
    <Route
      path={RouteConfig.editBook}
      component={EditBookPageConnected}
    />
    <Route
      path={RouteConfig.createBook}
      component={CreateBookPageConnected}
    />
    <Route
      path={RouteConfig.viewBook}
      component={ViewBookPageConnected}
    />
    <Route
      path={RouteConfig.books}
      component={ListBooksPageConnected}
    />
  </Switch>
)