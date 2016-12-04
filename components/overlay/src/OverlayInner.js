import React from 'react';

const OverlayInner = (props) => {
  const { children, style, className } = props;
  return (
    <div
      key="overlay"
      className={className}
      style={style}>
      {children}
    </div>
  );
};

export default OverlayInner;
