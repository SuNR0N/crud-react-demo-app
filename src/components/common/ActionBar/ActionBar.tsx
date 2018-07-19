import * as React from 'react';

export const ActionBar: React.SFC = (props) => {
  const { children } = props;

  return (
    <div className="action-bar d-flex justify-content-center">
      {children}
    </div>
  );
}
