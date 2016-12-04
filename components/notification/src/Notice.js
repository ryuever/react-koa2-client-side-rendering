import React, { Component, PropTypes } from 'react';
import { Icon } from 'react-eva';
import prefixer from 'react-eva/utils/prefixer';
import cx from 'classnames';

export default class Notice extends Component {
  static propTypes = {
    title: PropTypes.string,
    body: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['info', 'success', 'warning', 'error']),
    dismissAfter: PropTypes.number,
    onClick: PropTypes.func,
    onClose: PropTypes.func,
  }

  static defaultProps = {
    dismissAfter: 5 * 1000,
    onClick() {},
    onClose() {},
  }

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { dismissAfter } = this.props;
    if (dismissAfter) {
      this.timer = setTimeout(::this.close, dismissAfter);
    }
  }

  componentWilUnmount() {
    this.clearDismissTimer();
  }

  clearDismissTimer() {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  }

  get icon() {
    const { icon, type } = this.props;
    return (
      <div className="notification-icon">
        <img src={icon || require(`../assets/${type}.svg`)} />
      </div>
    );
  }

  click() {
    this.props.onClick();
  }

  close() {
    this.clearDismissTimer();
    const { close, onClose, tag } = this.props;
    close(tag);
    onClose();
  }

  render() {
    const { prefix, className, type, icon, title, body, action } = this.props;
    const prefixCls = prefixer('notification', prefix);
    return (
      <div className={cx(prefixCls, className)}
        onClick={::this.click}>
        {(icon || type) ? this.icon : null}
        <div className={`${prefixCls}-group`}>
          <h6 className={`${prefixCls}-title`}>
            {title}
          </h6>
          <p className={`${prefixCls}-message`}>
            {body}
          </p>
          {action ? (
            <div className={`${prefixCls}-action`}>
              {action}
            </div>
          ) : null}
          <button className={`${prefixCls}-close`}
            onClick={::this.close}>
            <Icon name="cross2" />
          </button>
        </div>
      </div>
    );
  }
}
