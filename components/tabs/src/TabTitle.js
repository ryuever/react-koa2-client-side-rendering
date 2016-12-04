import React, { Component, PropTypes } from 'react';
import classes from 'classnames';
import prefixer from 'react-eva/utils/prefixer';

export default class TabTitle extends Component {
  /* eslint-disable */
  componentDidMount() {
    const { hoverable, hoverTime } = this.props;
    if (!hoverable) {
      return null;
    }

    const tab = this.refs.tab;
    let timeoutId;

    tab.addEventListener('mouseenter', (e) => {
      timeoutId = setTimeout(() => {
        const { tabId, handleTabClick } = this.props;
        e.target.value = tabId;
        handleTabClick(e);
      }, hoverTime);
    });

    tab.addEventListener('mouseleave', () => {
      clearTimeout(timeoutId);
    });
  }
  /* eslint-enable */

  _onClick(e) {
    const { tabId, handleTabClick } = this.props;

    e.target.value = tabId;
    handleTabClick(e);
  }

  renderTab() {
    return (
      <a href="#">
        {this.props.children}
      </a>
    );
  }

  render() {
    const {
      style,
      prefix,
      tabActive,
      tabDisabled,
      activeClassName,
      disabledClassName,
    } = this.props;

    const className = classes(prefixer('tab-item', prefix), {
      [activeClassName]: tabActive,
      [disabledClassName]: tabDisabled,
    });

    return (
      <li
        ref="tab"
        style={style}
        className={className}
        onClick={::this._onClick}>
        {this.renderTab()}
      </li>
    );
  }
}

TabTitle.propTypes = {
  style             : PropTypes['object'],
  prefix            : PropTypes.string,
  active            : PropTypes.bool,
  disabled          : PropTypes.bool,
  activeClassName   : PropTypes.string,
  disabledClassName : PropTypes.string,
  handleTabClick    : PropTypes.func,
  tabId             : PropTypes.number,
};
