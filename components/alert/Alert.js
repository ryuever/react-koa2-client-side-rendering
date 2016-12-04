import React, { Component, PropTypes } from 'react';
import prefixer from 'react-eva/utils/prefixer';
import cx from 'classnames';
import { isPresent } from 'lib/lang';
import { Icon } from 'react-eva';

export default class Alert extends Component {
  constructor(props) {
    super(props);

    let visible = props.defaultVisible;

    if ('visible' in props) {
      visible = props.visible;
    }

    this.state = { visible };
  }

  componentWillReceiveProps(nextProps) {
    if ('visible' in nextProps) {
      this.setState({
        visible: nextProps.visible,
      });
    }
  }

  handleClose() {
    this.setState({
      visible: false,
    }, this.props.onClose);
  }

  renderCloseButton(prefixCls) {
    const { closable, closeText } = this.props;

    return closable ? (
      <button
        className={`${prefixCls}-action`}
        onClick={::this.handleClose}>
        {closeText || <Icon name="cross" />}
      </button>
    ) : null;
  }

  render() {
    const {
      prefix,
      className,
      style,
      type,
      title,
      children,
    } = this.props;

    const prefixCls = prefixer('alert', prefix);

    const classes = cx(prefixCls, {
      [`${type}`]: isPresent(type),
      hidden: !this.state.visible,
      multiple: title,
    }, className);

    return (
      <div className={classes} style={style}>
        {title ? (
          <div className={`${prefixCls}-group`}>
            <div className={`${prefixCls}-title`}>
              {title}
            </div>
            <div className={`${prefixCls}-message`}>
              {children}
            </div>
          </div>
        ) : (
          <div className={`${prefixCls}-message`}>
            {children}
          </div>
        )}
        {this.renderCloseButton(prefixCls)}
      </div>
    );
  }
}

Alert.defaultProps = {
  closable: false,
  defaultVisible: true,
  onClose() {},
};

Alert.propTypes = {
  type     : PropTypes.oneOf(['success', 'warning', 'error']),
  closable : PropTypes.bool,
  closeText: PropTypes.string,
  visible  : PropTypes.bool,
  onClose  : PropTypes.func,
};
