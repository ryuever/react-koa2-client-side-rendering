import React, { Component, PropTypes, cloneElement } from 'react';
import classes from 'classnames';
import prefixer from 'react-eva/utils/prefixer';

export default class Tabs extends Component {
  constructor(props) {
    super(props);

    this.titles = [];
    this.panels = [];
    this.cachedItems = [];

    const {
      activeClassName,
      disabledClassName,
    } = props;

    this.state = {
      activeTabId: '',
      disabledTabId: '',
      activeClassName,
      disabledClassName,
    };
  }

  componentWillMount() {
    const { children } = this.props;

    if (Array.isArray(children)) {
      children.forEach((child) => {
        this.titles.push(child.props.children[0]);
      });
    } else {
      this.titles.push(children.props.children[0]);
    }
  }

  /* eslint-disable */
  componentDidMount() {
    const ret = {
      activeTabId: 0,
    };
    this.titles.forEach((title, key) => {
      if (title.props.active) {
        ret.activeTabId = key;
      }

      if (title.props.disabled) {
        ret.disabledTabId = key;
      }
    });

    this.setState(ret);
  }
  /* eslint-enable */

  componentWillReceiveProps(nextProps) {
    const { children } = nextProps;
    const state = {};

    this.titles.forEach((title, key) => {
      if (children[key].props.children[0].props.active) {
        state.activeTabId = key;
      }
      if (children[key].props.children[0].props.disabled) {
        state.disabledTabId = key;
      }
    });

    this.setState(state);
  }

  _handleTabClick(activeKey, e) {
    this.setState({
      activeTabId: e.target.value,
    });

    this.props.onChange(activeKey, e);
  }

  renderTabList() {
    const { activeTabId, disabledTabId } = this.state;

    const {
      style,
      prefix,
      flexible,
      hoverable,
      hoverTime,
      showTitle,
      activeClassName,
      disabledClassName,
    } = this.props;

    if (!showTitle) {
      return null;
    }

    const className = classes(prefixer('tab', prefix), {
      'tab-full': flexible,
    });

    return (
      <ul className={className}>
        {this.titles.map((tabTitle, key) =>
          cloneElement(tabTitle, {
            key,
            prefix,
            hoverable,
            hoverTime,
            tabId: key,
            activeClassName,
            disabledClassName,
            style: style.tabTitle,
            tabActive: activeTabId === key,
            tabDisabled: disabledTabId === key,
            handleTabClick: this._handleTabClick.bind(this, tabTitle.key),
          })
        )}
      </ul>
    );
  }

  renderTabPanel() {
    const { activeTabId } = this.state;
    const {
      style,
      prefix,
      children,
      cached,
    } = this.props;

    if (typeof activeTabId === 'undefined') {
      return null;
    }

    if (cached) {
      if (!this.cachedItems[activeTabId]) {
        this.cachedItems[activeTabId] = children[activeTabId];
      }
    } else {
      this.cachedItems[activeTabId] = children[activeTabId];
    }

    const tabItem = [];
    this.cachedItems.forEach((item, key) => {
      if (item) {
        tabItem.push(
          cloneElement(item, {
            key,
            prefix,
            activeTabId,
            style,
            active: key === activeTabId,
          })
        );
      }
    });

    return tabItem;
  }

  render() {
    const {
      style,
      prefix,
      direction,
      className,
    } = this.props;

    const cx = classes(prefixer('tabs', prefix), className, {
      [`tab-${direction}`]: direction,
    });

    return (
      <div className={cx} style={style.tabs}>
        {this.renderTabList()}
        {this.renderTabPanel()}
      </div>
    );
  }
}

Tabs.propTypes = {
  prefix           : PropTypes.string,
  style            : PropTypes['object'],
  direction        : PropTypes.oneOf(['', 'vertical']),
  flexible         : PropTypes.bool,
  hoverable        : PropTypes.bool,
  hoverTime        : PropTypes.number,
  showTitle        : PropTypes.bool,
  activeClassName  : PropTypes.string,
  disabledClassName: PropTypes.string,
  cached           : PropTypes.bool,
  onChange         : PropTypes.func,
};

Tabs.defaultProps = {
  style            : {},
  flexible         : false,
  direction        : '',
  hoverable        : false,
  hoverTime        : 300,
  showTitle        : true,
  activeClassName  : 'active',
  disabledClassName: 'disabled',
  cached           : false,
  onChange() {},
};
