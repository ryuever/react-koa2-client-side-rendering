import React, { Component, PropTypes } from 'react';
import cx from 'classnames';

export default class NativeSelect extends Component {
  /* eslint-disable no-useless-constructor */
  constructor(props) {
    super(props);
  }

  render() {
    const { multiple, options, ...otherProps } = this.props;
    const classes = cx('select', {
      'is-multiple': multiple,
    });

    return (
      <div className={classes}>
        <select
          className="form-control"
          multiple={multiple}
          {...otherProps}>
          {options.map((option, i) =>
            <option key={i}
              value={option.value || option}>
              {option.label || option}
            </option>
          )}
        </select>
      </div>
    );
  }
}

NativeSelect.defaultProps = {
  size: 0,
  multiple: false,
  options: [],
};

NativeSelect.propTypes = {
  size    : PropTypes.number,
  multiple: PropTypes.bool,
  options : PropTypes['array'],
};
