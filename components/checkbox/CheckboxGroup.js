import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import prefixer from 'react-eva/utils/prefixer';
import cx from 'classnames';

import Checkbox from './Checkbox';

export default class CheckboxGroup extends Component {
  constructor(props) {
    super(props);

    let value = props.defaultValue;

    if ('value' in props) {
      value = props.value;
    }

    this.state = { value };
    this.shouldComponentUpdate = ::PureRenderMixin.shouldComponentUpdate;
  }

  componentWillReceiveProps(nextProps) {
    if ('value' in nextProps) {
      this.setState({
        value: nextProps.value || [],
      });
    }
  }

  options() {
    const { options } = this.props;
    return options.map(option => {
      if (typeof option === 'string') {
        return {
          label: option,
          value: option,
        };
      }

      return option;
    });
  }

  handleChange(option, optionIndex) {
    const value = [...this.state.value];

    if (optionIndex === -1) {
      value.push(option.value);
    } else {
      value.splice(optionIndex, 1);
    }

    if (!('value' in this.props)) {
      this.setState({ value });
    }

    this.props.onChange(value);
  }

  renderChildren() {
    const { disabled, children } = this.props;
    const currentValue = this.state.value;

    return React.Children.map(children, child => {
      const option = child.props;

      if (child.type === Checkbox && option) {
        const optionIndex = currentValue.indexOf(option.value);
        const mapProps = Object.assign({}, option, {
          key: child.key || option.value,
          checked: optionIndex !== -1,
          disabled: option.disabled || disabled,
          onChange: this.handleChange.bind(this, option, optionIndex),
        });

        return React.cloneElement(child, mapProps);
      }

      return child;
    });
  }

  render() {
    const { prefix, className } = this.props;
    const prefixCls = prefixer('checkbox-group', prefix);
    const classes = cx(prefixCls, className);
    return (
      <div className={classes}>
        {this.renderChildren()}
      </div>
    );
  }
}

CheckboxGroup.defaultProps = {
  defaultValue: [],
  options: [],
  onChange() {},
};

CheckboxGroup.propTypes = {
  defaultValue: PropTypes['array'],
  value       : PropTypes['array'],
  options     : PropTypes['array'].isRequired,
  onChange    : PropTypes.func,
};
