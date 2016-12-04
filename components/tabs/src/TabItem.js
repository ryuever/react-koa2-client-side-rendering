import React, { Component, PropTypes } from 'react';

export default class TabItem extends Component {

  render() {
    const {
      style,
      prefix,
      active,
      children,
    } = this.props;
    return React.cloneElement(children[1], {
      active,
      prefix,
      style: style.tabPanel,
    });
  }
}

TabItem.propTypes = {
  active: PropTypes.bool,
  style : PropTypes['object'],
};
