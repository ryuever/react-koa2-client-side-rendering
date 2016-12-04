import React, { PropTypes } from 'react';
import cx from 'classnames';
import prefixer from 'react-eva/utils/prefixer';
import { Icon } from 'react-eva';

const Button = (props) => {
  const {
    prefix,
    className,
    size,
    type,
    htmlType,
    icon,
    isGhost,
    children,
    ...rest
  } = props;

  const prefixCls = prefixer('button', prefix);
  const classes = cx(prefixCls, {
    [`${prefixCls}-${size}`]: size,
    [`${prefixCls}-${type}`]: type,
    [`${prefixCls}-ghost`]: isGhost,
  }, className);

  delete rest.component;

  return (
    <props.component {...rest}
      type={htmlType}
      className={classes}>
      {children}
      {icon ? <Icon name={icon} /> : null}
    </props.component>
  );
};

Button.defaultProps = {
  component: 'button',
  isGhost: false,
};

Button.propTypes = {
  isGhost  : PropTypes.bool,
  size     : PropTypes.oneOf(['xs', 'sm', 'lg', 'full']),
  type     : PropTypes.oneOf(['primary', 'success', 'warning', 'error', 'dark', 'link']),
  htmlType : PropTypes.oneOf(['submit', 'reset', 'button', 'menu']),
  onClick  : PropTypes.func,
};

export default Button;
