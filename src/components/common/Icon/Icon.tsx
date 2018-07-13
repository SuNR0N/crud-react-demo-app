import * as React from 'react';

import './Icon.css';

// tslint:disable-next-line:no-var-requires
const SpritePath = require('../../../assets/icons/sprite.svg');

export type IconSymbol =
  'edit-regular' |
  'eye-regular' |
  'plus-square-regular' |
  'github-brands' |
  'react-brands' |
  'trash-alt-regular';

export interface IProps {
  className?: string;
  symbol: IconSymbol;
}

export const Icon: React.SFC<IProps> = (props) => {
  const {
    className = '',
    symbol,
  } = props;

  return (
    <svg className={`icon ${className}`}>
      <use xlinkHref={`${SpritePath}#${symbol}`} />
    </svg>
  );
}