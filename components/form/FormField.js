import React, { Component, PropTypes } from 'react';
import cx from 'classnames';
import { isPresent, isBlank } from 'lib/lang';

export default class FormField extends Component {
  getField() {
    const children = React.Children.toArray(this.props.children);
    const child = children.filter(child => {
      return child.props && 'data-meta-field' in child.props;
    })[0];

    return isPresent(child) ? child : null;
  }

  getFieldProp(prop) {
    const field = this.getField();
    return field && field.props && field.props[prop];
  }

  getFieldId() {
    return this.getFieldProp('id');
  }

  renderLabel() {
    const { labelCol, label, id } = this.props;

    if (isBlank(label)) {
      return null;
    }

    const children = (
      <label
        className="form-label"
        htmlFor={id || this.getFieldId()}>{label}
      </label>
    );

    return labelCol ? (
      <div className={`col-${labelCol}`}>
        {children}
      </div>
    ) : children;
  }

  renderControlWithStatus(children) {
    const { valid, invalid } = this.props;
    const classes = cx('form-status', {
      valid,
      invalid,
    });

    return (
      <div className={classes} key="form-status">
        {children}
      </div>
    );
  }

  renderMessage() {
    const { message } = this.props;
    return (
      <div className="form-note" key="form-note">
        {message}
      </div>
    );
  }

  renderField(children) {
    const { valid, invalid } = this.props;

    return valid || invalid ? [
      this.renderControlWithStatus(children),
      this.renderMessage(),
    ] : children;
  }

  renderFieldWrapper() {
    const { fieldCol, children } = this.props;
    return fieldCol ? (
      <div className={`col-${fieldCol}`}>
        {this.renderField(children)}
      </div>
    ) : this.renderField(children);
  }

  render() {
    const { labelCol, fieldCol, className } = this.props;
    const classes = cx('form-field', {
      row: isPresent(labelCol) || isPresent(fieldCol),
    }, className);
    return (
      <div className={classes}>
        {this.renderLabel()}
        {this.renderFieldWrapper()}
      </div>
    );
  }
}

FormField.defaultProps = {
};

FormField.propTypes = {
  label   : PropTypes.string,
  labelCol: PropTypes.number,
  fieldCol: PropTypes.number,
};
