import * as React from 'react';
import {
  Button,
  ButtonProps,
} from 'reactstrap';

import {
  Icon,
  IconSymbol,
} from '../Icon';

export interface IProps extends ButtonProps {
  symbol?: IconSymbol;
}

export const IconButton: React.SFC<IProps> = (props) => {
  const {
    symbol,
    ref,
    ...buttonProps
  } = props;

  let classes = `icon-button`;
  if (buttonProps.className) {
    classes = `${classes} ${buttonProps.className}`;
  }

  return (
    <Button
      className={classes}
      {...buttonProps}
    >
      {symbol && 
        <Icon symbol={symbol}/>
      }
      {buttonProps.children &&
        <span>{buttonProps.children}</span>
      }
    </Button>
  )
};