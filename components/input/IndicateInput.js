import React, { Component, PropTypes } from 'react';
import prefixer from 'react-eva/utils/prefixer';

import cx from 'classnames';

export default class IndicateInput extends Component {
  constructor(props) {
    super(props);

    let checked = props.defaultChecked;

    if ('checked' in props) {
      checked = props.checked;
    }

    this.state = { checked };
  }

  componentWillReceiveProps(nextProps) {
    if ('checked' in nextProps) {
      this.setState({
        checked: nextProps.checked,
      });
    }
  }

  handleChange(event) {
    if (!('checked' in this.props)) {
      this.setState({
        checked: event.target.checked,
      });
    }

    this.props.onChange(event);
  }

  render() {
    const {
      type,
      prefix,
      className,
      disabled,
      children,
      ...otherProps
    } = this.props;

    delete otherProps.defaultChecked;

    const { checked } = this.state;
    const prefixCls = prefixer(className, prefix);
    const classes = cx(prefixCls, { disabled });

    return (
      <label className={classes}>
        <input {...otherProps}
          type={type}
          checked={checked}
          disabled={disabled}
          onChange={::this.handleChange} />
        <i className="thumb" />
        {children}
      </label>
    );
  }
}

IndicateInput.defaultProps = {
  type: 'checkbox',
  defaultChecked: false,
  onChange() {},
};

IndicateInput.propTypes = {
  type          : PropTypes.oneOf(['radio', 'checkbox']),
  defaultChecked: PropTypes.bool,
  prefix        : PropTypes.string,
  className     : PropTypes.string,
  onChange      : PropTypes.func,
};
