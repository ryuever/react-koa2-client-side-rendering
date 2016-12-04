import React, { PropTypes } from 'react';
import { Button, Icon } from 'react-eva';

const FileInput = ({
  text,
  icon,
  onChange,
  buttonProps,
  ...rest
}) => (
  <Button component="label" {...buttonProps}>
    <input type="file" onChange={onChange} {...rest} />
    <Icon name={icon} />
    {text ? (
      <span className="button-text">
        {text}
      </span>
    ) : null}
  </Button>
);

FileInput.defaultProps = {
  icon: 'picture',
  onChange() {},
};

FileInput.propTypes = {
  text   : PropTypes['any'],
  icon: PropTypes.string,
  onChange: PropTypes.func,
};

export default FileInput;
