import * as React from 'react';
import {
  RouteComponentProps,
  withRouter,
} from 'react-router-dom';

import {
  IconButton,
  IProps as IIconButtonProps,
} from '../IconButton';

export interface IProps extends IIconButtonProps, RouteComponentProps<any> {
  route: string;
}

const RoutedButtonComponent: React.SFC<IProps> = (props) => {
  const {
    route,
    history,
    staticContext,
    ...iconButtonProps
  } = props;

  const navigateToRoute = () => history.push(route);

  return (
    <IconButton
      {...iconButtonProps}
      onClick={navigateToRoute}
    />
  );
};

export const RoutedButton = withRouter(RoutedButtonComponent);