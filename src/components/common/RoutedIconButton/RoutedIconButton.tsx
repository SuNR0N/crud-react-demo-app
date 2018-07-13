import * as React from 'react';
import {
  RouteComponentProps,
  withRouter,
} from 'react-router-dom';
import { Button } from 'reactstrap';

import {
  Icon,
  IconSymbol,
} from '../Icon';

export interface IProps extends RouteComponentProps<any> {
  color: string;
  route: string;
  symbol: IconSymbol;
}

const IconButton: React.SFC<IProps> = (props) => {
  const {
    color,
    history,
    route,
    symbol,
  } = props;

  const navigateToRoute = () => history.push(route);

  return (
    <Button
      onClick={navigateToRoute}
      outline={true}
      color={color}
    >
      <Icon symbol={symbol}/>
    </Button>
  )
};

export const RoutedIconButton = withRouter(IconButton);