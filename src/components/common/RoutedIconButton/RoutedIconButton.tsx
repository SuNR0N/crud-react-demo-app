import * as React from 'react';
import {
  RouteComponentProps,
  withRouter,
} from 'react-router-dom';
import {
  Button,
  ButtonProps,
} from 'reactstrap';

import {
  Icon,
  IconSymbol,
} from '../Icon';

export interface IProps extends ButtonProps, RouteComponentProps<any> {
  route: string;
  symbol: IconSymbol;
}

const IconButton: React.SFC<IProps> = (props) => {
  const {
    children,
    className,
    color,
    disabled,
    history,
    route,
    symbol,
  } = props;

  const navigateToRoute = () => history.push(route);
  let classes = `icon-button`;
  if (className) {
    classes = `${classes} ${className}`;
  }

  return (
    <Button
      className={classes}
      color={color}
      disabled={disabled}
      onClick={navigateToRoute}
    >
      <Icon symbol={symbol}/>
      {children &&
        <span>{children}</span>
      }
    </Button>
  )
};

export const RoutedIconButton = withRouter(IconButton);