import React from 'react';
import prefixer from 'react-eva/utils/prefixer';

const ButtonGroup = (props) => {
  const { prefix, children } = props;
  return (
    <div className={prefixer('button-group', prefix)}>
      {children}
    </div>
  );
};

export default ButtonGroup;
