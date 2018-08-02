import React, { SFC } from 'react';

import {
  Icon,
  IconSymbol,
} from '../Icon';

export interface IProps {
  symbol?: IconSymbol,
  text?: string;
}

export const Spinner: SFC<IProps> = (props) => {
  const {
    symbol = 'spinner-solid',
    text = 'Loading',
  } = props;

  return (
    <div className="spinner">
      <Icon
        className="icon-spin"
        symbol={symbol}
      />
      <span className="spinner__text">{text}</span>
      <span className="spinner__dot">.</span>
      <span className="spinner__dot">.</span>
      <span className="spinner__dot">.</span>
    </div>
  );
}
