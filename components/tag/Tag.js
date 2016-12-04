import React, { PropTypes } from 'react';
import cx from 'classnames';
import { Icon } from 'react-eva';
import prefixer from 'react-eva/utils/prefixer';

export const Tag = (props) => {
  const {
    prefix,
    className,
    type,
    closable,
    children,
    ...rest
  } = props;

  const prefixCls = prefixer('tag', prefix);
  const classes = cx(prefixCls, type, className);

  return (
    <div className={classes}
      {...rest}>
      <span className="tag-text">
        {children}
      </span>
      {closable ? (
        <button className="tag-close">
          <Icon name="cross" />
        </button>
      ) : null}
    </div>
  );
};

Tag.defaultProps = {
  closable: false,
};

Tag.propsTypes = {
  closable: PropTypes.bool,
  type: PropTypes.arrayOf(['info', 'success', 'warning', 'error']),
};
