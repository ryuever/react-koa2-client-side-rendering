import React, { PropTypes } from 'react';

const Input = ({ type, onChange, ...otherProps }) => (
  <input
    className="form-control"
    type={type}
    onChange={onChange}
    {...otherProps} />
);

Input.defaultProps = {
  type: 'text',
  onChange() {},
};

Input.propTypes = {
  type    : PropTypes.string,
  onChange: PropTypes.func,
};

export default Input;
