import React, { SFC } from 'react';

export const ActionBar: SFC = (props) => {
  const { children } = props;

  return (
    <div className="action-bar d-flex justify-content-center">
      {children}
    </div>
  );
}
