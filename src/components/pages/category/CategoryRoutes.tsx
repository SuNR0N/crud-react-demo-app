import * as React from 'react';
import {
  Route,
  Switch,
} from 'react-router-dom';

import { RouteConfig } from '../../../config/RouteConfig';
import { CreateCategoryPage } from './CreateCategory';
import { EditCategoryPage } from './EditCategory';
import { ListCategoriesPageConnected } from './ListCategories';
import { ViewCategoryPageConnected } from './ViewCategory';

export const CategoryRoutes: React.SFC = () => (
  <Switch>
    <Route
      path={RouteConfig.editCategory}
      component={EditCategoryPage}
    />
    <Route
      path={RouteConfig.createCategory}
      component={CreateCategoryPage}
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