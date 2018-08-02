import React, { SFC } from 'react';

export interface IProps {
  className?: string;
}

export const ActionCell: SFC<IProps> = (props) => {
  const { children } = props;

  let className = 'action-cell d-flex justify-content-around';
  if (props.className) {
    className = `${className} ${props.className}`;
  }

  return (
    <td className={className}>
      {children}
    </td>
  );
};
