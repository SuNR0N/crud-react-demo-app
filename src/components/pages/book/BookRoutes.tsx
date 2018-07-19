import * as React from 'react';
import {
  Route,
  Switch,
} from 'react-router-dom';

import { RouteConfig } from '../../../config/RouteConfig';
import { CreateBookPageConnected } from './CreateBook';
import { EditBookPage } from './EditBook';
import { ListBooksPageConnected } from './ListBooks';
import { ViewBookPageConnected } from './ViewBook';

export const BookRoutes: React.SFC = () => (
  <Switch>
    <Route
      path={RouteConfig.editBook}
      component={EditBookPage}
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