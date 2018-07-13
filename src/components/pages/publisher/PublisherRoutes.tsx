import * as React from 'react';
import {
  Route,
  Switch,
} from 'react-router-dom';

import { RouteConfig } from '../../../config/RouteConfig';
import { CreatePublisherPage } from './CreatePublisher';
import { EditPublisherPage } from './EditPublisher';
import { ListPublishersPageConnected } from './ListPublishers';
import { ViewPublisherPage } from './ViewPublisher';

export const PublisherRoutes: React.SFC = () => (
  <Switch>
    <Route
      path={RouteConfig.editPublisher}
      component={EditPublisherPage}
    />
    <Route
      path={RouteConfig.createPublisher}
      component={CreatePublisherPage}
    />
    <Route
      path={RouteConfig.viewPublisher}
      component={ViewPublisherPage}
    />
    <Route
      path={RouteConfig.publishers}
      component={ListPublishersPageConnected}
    />
  </Switch>
)