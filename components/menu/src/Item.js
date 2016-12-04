import React, { Component, PropTypes } from 'react';

export default class Item extends Component {
  static propTypes = {
    prefix: PropTypes.string,
  }

  render() {
    const { children } = this.props;
    return (
      <li className="option">
        {children}
      </li>
    );
  }
}
