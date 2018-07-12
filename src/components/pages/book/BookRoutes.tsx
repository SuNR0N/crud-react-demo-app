import * as React from 'react';
import {
  Route,
  Switch,
} from 'react-router-dom';

import { RouteConfig } from '../../../config/RouteConfig';
import { CreateBookPage } from './CreateBook';
import { EditBookPage } from './EditBook';
import { ListBooksPage } from './ListBooks';
import { ViewBookPage } from './ViewBook';

export const BookRoutes: React.SFC = () => (
  <Switch>
    <Route
      path={RouteConfig.editBook}
      component={EditBookPage}
    />
    <Route
      path={RouteConfig.createBook}
      component={CreateBookPage}
    />
    <Route
      path={RouteConfig.viewBook}
      component={ViewBookPage}
    />
    <Route
      path={RouteConfig.books}
      component={ListBooksPage}
    />
  </Switch>
)