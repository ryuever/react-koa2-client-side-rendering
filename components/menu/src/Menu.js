import React, { Component, PropTypes } from 'react';

export default class Menu extends Component {
  static propTypes = {
    prefix: PropTypes.string,
  }

  render() {
    const { children } = this.props;
    return (
      <ul className="select-content">
        {children}
      </ul>
    );
  }
}
