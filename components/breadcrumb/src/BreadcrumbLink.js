import React, { Component, PropTypes } from 'react';
import isString from 'lodash/isString';

export default class BreadcrumbLink extends Component {
  renderLink() {
    const { href, children } = this.props;
    // For this component, it only care whether there is a href prop.
    // If it exits, then wrap its children within <a> tag.
    // or not exist, it will check whether its children is just a string,
    // In this condition, it will be considered as a path without href
    // (it could be the final or beginning);
    if (href) {
      return <a href={href}>{children}</a>;
    } else if (isString(children)) {
      return <span>{children}</span>;
    }
    return children;
  }

  render() {
    return (
      <li>
        {this.renderLink()}
      </li>
    );
  }
}

BreadcrumbLink.propTypes = {
  href: PropTypes.string,
};
