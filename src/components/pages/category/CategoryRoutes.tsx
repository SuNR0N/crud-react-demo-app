import * as React from 'react';
import {
  Route,
  Switch,
} from 'react-router-dom';

import { RouteConfig } from '../../../config/RouteConfig';
import { CreateCategoryPageConnected } from './CreateCategory';
import { EditCategoryPageConnected } from './EditCategory';
import { ListCategoriesPageConnected } from './ListCategories';
import { ViewCategoryPageConnected } from './ViewCategory';

export const CategoryRoutes: React.SFC = () => (
  <Switch>
    <Route
      path={RouteConfig.editCategory}
      component={EditCategoryPageConnected}
    />
    <Route
      path={RouteConfig.createCategory}
      component={CreateCategoryPageConnected}
    />
    <Route
      path={RouteConfig.viewCategory}
      component={ViewCategoryPageConnected}
    />
    <Route
      path={RouteConfig.categories}
      component={ListCategoriesPageConnected}
    />
  </Switch>
)