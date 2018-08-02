import React, { SFC } from 'react';

// tslint:disable-next-line:no-var-requires
const SpritePath = require('../../../assets/icons/sprite.svg');

export type IconSymbol =
  'angle-double-left-solid' |
  'angle-double-right-solid' |
  'angle-left-solid' |
  'angle-right-solid' |
  'calendar-alt-regular' |
  'edit-regular' |
  'eye-regular' |
  'github-brands' |
  'plus-square-regular' |
  'react-brands' |
  'spinner-solid' |
  'trash-alt-regular';

export interface IProps {
  className?: string;
  symbol: IconSymbol;
}

export const Icon: SFC<IProps> = (props) => {
  const {
    className = '',
    symbol,
  } = props;

  return (
    <svg className={`icon ${className}`}>
      <use xlinkHref={`${SpritePath}#${symbol}`} />
    </svg>
  );
};