import React, { PropTypes } from 'react';
import prefixer from 'react-eva/utils/prefixer';
import IndicateInput from '../input/IndicateInput';
import cx from 'classnames';

const Radio = ({ children, onChange, prefix, className, ...otherProps }) => (
  <IndicateInput {...otherProps}
    type="radio"
    className={cx(prefixer('radio', prefix), className)}
    onChange={onChange}>
    {children}
  </IndicateInput>
);

Radio.defaultProps = {
  onChange() {},
};

Radio.propTypes = {
  onChange: PropTypes.func,
};

export default Radio;
