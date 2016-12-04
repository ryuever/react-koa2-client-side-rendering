import React, { PropTypes } from 'react';
import IndicateInput from '../input/IndicateInput';
import cx from 'classnames';

const Switch = ({ size, label, onChange, ...otherProps }) => (
  <IndicateInput {...otherProps}
    className={cx('switch', {
      [`switch-${size}`]: size,
    })}
    onChange={onChange}>
    {label}
  </IndicateInput>
);

Switch.defaultProps = {
  onChange() {},
};

Switch.propTypes = {
  size    : PropTypes.oneOf(['lg', 'sm', 'xs']),
  onChange: PropTypes.func,
};

export default Switch;
