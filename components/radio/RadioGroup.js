import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import prefixer from 'react-eva/utils/prefixer';
import cx from 'classnames';

import Radio from './Radio';

export default class RadioGroup extends Component {
  constructor(props) {
    super(props);

    let value;
    if ('value' in props) {
      value = props.value;
    } else if ('defaultValue' in props) {
      value = props.defaultValue;
    } else {
      value = this.getCheckedValue(props);
    }

    this.state = { value };
    this.shouldComponentUpdate = ::PureRenderMixin.shouldComponentUpdate;
  }

  componentWillReceiveProps(nextProps) {
    let value;
    if ('value' in nextProps) {
      value = nextProps.value;
    } else if ('defaultValue' in nextProps) {
      value = nextProps.defaultValue;
    } else {
      value = this.getCheckedValue(nextProps);
    }

    this.setState({ value });
  }

  getCheckedValue({ children }) {
    let value;
    React.Children.forEach(children, child => {
      if (child.props && child.props.checked) {
        value = child.props.value;
      }
    });

    return value;
  }

  // get radioGroupChildren() {
  radioGroupChildren() {  
    const { disabled, children } = this.props;
    const currentValue = this.state.value;

    return React.Children.map(children, child => {
      const option = child.props;
      if (child.type === Radio && option) {
        const mapProps = Object.assign({}, option, {
          key: child.key || option.value,
          checked: currentValue === option.value,
          disabled: option.disabled || disabled,
          onChange: ::this.handleChange,
        });

        return React.cloneElement(child, mapProps);
      }

      return child;
    });
  }

  handleChange(event) {
    const { value } = event.target;
    if (!('value' in this.props)) {
      this.setState({ value });
    }

    this.props.onChange(event);
  }

  render() {
    const { prefix, className } = this.props;
    const prefixCls = prefixer('radio-group', prefix);
    const classes = cx(prefixCls, className);
    return (
      <div className={classes}>
        {this.radioGroupChildren()}
      </div>
    );
  }
}

RadioGroup.defaultProps = {
  onChange() {},
};

RadioGroup.propTypes = {
  onChange: PropTypes.func,
};
