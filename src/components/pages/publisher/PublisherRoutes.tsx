import React, { SFC } from 'react';
import {
  Route,
  Switch,
} from 'react-router-dom';

import { RouteConfig } from '../../../config/RouteConfig';
import { CreatePublisherPageConnected } from './CreatePublisher';
import { EditPublisherPageConnected } from './EditPublisher';
import { ListPublishersPageConnected } from './ListPublishers';
import { ViewPublisherPageConnected } from './ViewPublisher';

export const PublisherRoutes: SFC = () => (
  <Switch>
    <Route
      path={RouteConfig.editPublisher}
      component={EditPublisherPageConnected}
    />
    <Route
      path={RouteConfig.createPublisher}
      component={CreatePublisherPageConnected}
    />
    <Route
      path={RouteConfig.viewPublisher}
      component={ViewPublisherPageConnected}
    />
    <Route
      path={RouteConfig.publishers}
      component={ListPublishersPageConnected}
    />
  </Switch>
);