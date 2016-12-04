import React, { PropTypes } from 'react';
import prefixer from 'react-eva/utils/prefixer';
import IndicateInput from '../input/IndicateInput';
import cx from 'classnames';

const Checkbox = ({ children, onChange, prefix, className, ...otherProps }) => (
  <IndicateInput {...otherProps}
    className={cx(prefixer('checkbox', prefix), className)}
    onChange={onChange}>
    {children}
  </IndicateInput>
);

Checkbox.defaultProps = {
  onChange() {},
};

Checkbox.propTypes = {
  onChange: PropTypes.func,
};

export default Checkbox;
