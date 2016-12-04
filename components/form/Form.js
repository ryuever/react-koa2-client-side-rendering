import React, { Component, PropTypes } from 'react';
import cx from 'classnames';
import prefixer from 'react-eva/utils/prefixer';

export default class Form extends Component {
  handleSubmit(isPrevent, event) {
    if (isPrevent) {
      event.preventDefault();
    }

    this.props.onSubmit(event);
  }

  render() {
    const { prefix, className, isPrevent, children, ...rest } = this.props;
    const classes = cx(prefixer('form', prefix), className);

    return (
      <form {...rest}
        className={classes}
        onSubmit={this.handleSubmit.bind(this, isPrevent)}>
        {children}
      </form>
    );
  }
}

Form.defaultProps = {
  isPrevent: true,
  onSubmit() {},
};

Form.propTypes = {
  inPrevent: PropTypes.bool,
  onSubmit : PropTypes.func,
};
