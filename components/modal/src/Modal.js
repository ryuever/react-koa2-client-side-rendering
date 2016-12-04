import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import prefixer from 'react-eva/utils/prefixer';
import cx from 'classnames';
import { Icon } from 'react-eva';
import { isString, isPresent } from 'lib/lang';
import KeyCode from 'react-eva/utils/keyCode';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import CSSTransition from '../../CSSTransition';
import RenderChildrenOnly from './RenderChildrenOnly';
import {
  getScrollBarWidth,
  getNodeOffset,
  hasScrollBar,
} from 'react-eva/utils/nodeProperties';

function noop() {}

export default class Modal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: props.visible,
    };
    this.prevActive = '';
    this.shouldComponentUpdate = ::PureRenderMixin.shouldComponentUpdate;
  }

  componentDidMount() {
    this.componentDidUpdate({});
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      visible: nextProps.visible,
    });
  }

  componentDidUpdate(prevProps) {
    const { visible, triggerPosition } = this.props;

    // First appeared, focus on backdrop
    if (visible) {
      if (!prevProps.visible || !isPresent(prevProps.visible)) {
        this.prev = document.activeElement;
        this.refs.backdrop.focus();
      }
    }

    const node = ReactDOM.findDOMNode(this.refs.modal);
    if (!node) {
      return;
    }

    if (!prevProps.visible && visible) {
      this.consumeScrollBar();
      const style = node.style;
      this.prevActive = document.activeElement;
      style.transformOrigin = null;
      const nodeOffset = getNodeOffset(node);

      const left = triggerPosition.left - (nodeOffset.left - node.offsetWidth / 2);
      const top = triggerPosition.top - (nodeOffset.top - node.offsetHeight / 2);

      const position = `${left}px ${top}px`;

      ['Webkit', 'Moz', 'Ms', 'ms'].forEach((prefix) => {
        style[`${prefix}TransformOrigin`] = position;
      });

      style.transformOrigin = position;
    }

    if (!visible && prevProps.visible) {
      if (this.prevActive) {
        this.prevActive.focus();
      }
      this.releaseScrollBar();
    }
  }

  consumeScrollBar() {
    const node = ReactDOM.findDOMNode(this.refs.backdrop);
    const { visible } = this.props;

    if (hasScrollBar()) {
      const scroolBarWidth = getScrollBarWidth();
      if (visible) {
        document.body.style.paddingRight = `${scroolBarWidth}px`;
        document.body.style.overflow = 'hidden';
        node.style.paddingRight = `${scroolBarWidth}px`;
      }
    }
  }

  releaseScrollBar() {
    if (hasScrollBar) {
      const node = ReactDOM.findDOMNode(this.refs.backdrop);
      document.body.style.overflow = null;
      document.body.style.paddingRight = null;
      node.style.paddingRight = null;
    }
  }

  handleClose() {
    const { onClose, beforeClose } = this.props;

    if (beforeClose) {
      beforeClose();
    }
    onClose();

    this.setState({
      visible: false,
    });
  }

  handleCancel() {
    this.handleClose();
  }

  handleSubmit() {
    const { onConfirm } = this.props;
    onConfirm();
  }

  handleKeyDown(e) {
    e.stopPropagation();
    if (e.keyCode === KeyCode.ESC) {
      this.handleClose();
    }
  }

  handleBackdropClick(e) {
    e.stopPropagation();

    const { backdropClosable } = this.props;
    if (backdropClosable) {
      if (e.target === e.currentTarget) {
        this.handleClose();
      }
    }
  }

  handleAfterBackdropLeave(node) {
    node.style.display = 'none';
  }

  renderBackdropElement() {
    const { visible, prefix } = this.state;

    const className = prefixer('modal-backdrop', prefix);
    const style = { ...this.getzIndexStyle() };

    // if visible, remove display prop from mask
    if (visible) {
      style.display = null;
    }

    const backdropElement = (
      <RenderChildrenOnly visible={visible}>
        <div
          ref="backdrop"
          tabIndex={-1}
          style={style}
          className={className}
          onKeyDown={::this.handleKeyDown}
          onClick={::this.handleBackdropClick}/>
      </RenderChildrenOnly>
    );

    return (
      <CSSTransition
        transitionAppear
        transitionEnter
        transitionLeave
        component=""
        transitionName="fade"
        visibleProps="visible"
        transitionAppearTimeout={300}
        transitionEnterTimeout={300}
        transitionLeaveTimeout={150}
        afterLeave={::this.handleAfterBackdropLeave}>
        {backdropElement}
      </CSSTransition>
    );
  }

  renderHeader() {
    const { title, closable, style } = this.props;

    let closeButton = null;
    if (closable) {
      closeButton = (
        <button className="modal-close" onClick={::this.handleClose}>
          <Icon name="cross"/>
        </button>
      );
    }
    return (
      <div className="modal-head" style={style.header}>
        <h2 className="modal-title">{title}</h2>
        {closeButton}
      </div>
    );
  }

  renderBody() {
    const { style, children } = this.props;
    let element = '';

    if (isString(children)) {
      element = <p>{children}</p>;
    } else {
      element = children;
    }

    return (
      <div className="modal-body" style={style.body}>
        {element}
      </div>
    );
  }

  renderFoot() {
    const {
      confirmable, cancelable, confirm,
      cancel, style, pending,
      disabled, isDialog,
    } = this.props;

    if (isDialog) {
      return null;
    }

    let confirmButton = null;
    let cancelButton = null;

    if (cancelable) {
      cancelButton = (
        <button className="button button-link" onClick={::this.handleCancel}>
          {cancel}
        </button>
      );
    }

    if (confirmable) {
      confirmButton = (
        <button
          disabled={pending || disabled}
          className="button button-primary"
          onClick={::this.handleSubmit}>
          {pending ? this.renderLoading() : confirm}
        </button>
      );
    }

    return (
      <div className="modal-foot" style={style.foot}>
        {cancelButton}
        {confirmButton}
      </div>
    );
  }

  renderLoading() {
    return (
      <div className="loading-dot">
        <i className="dot" />
        <i className="dot" />
        <i className="dot" />
      </div>
    );
  }

  handleAfterModalLeave() {
    if (this.refs.wrapper) {
      this.refs.wrapper.style.display = 'none';
    }
  }

  getzIndexStyle() {
    const { style } = this.props;

    const zIndexStyle = {};

    if (style && style.zIndex) {
      zIndexStyle.zIndex = style.zIndex;
    }

    return zIndexStyle;
  }

  renderModal() {
    const { prefix, className, hideWithRelease, style, width } = this.props;
    const { visible } = this.state;

    const modalPrefixCls = prefixer('modal', prefix);
    const classes = cx(modalPrefixCls, className);
    const modalStyle = {
      ...style.modal,
      ...this.getzIndexStyle(),
    };

    if (width) {
      modalStyle.width = width;
    }

    let child = (
      <RenderChildrenOnly
        visible={visible}>
        <div
          ref="modal"
          style={modalStyle}
          className={classes}>
          {this.renderHeader()}
          {this.renderBody()}
          {this.renderFoot()}
        </div>
      </RenderChildrenOnly>
    );
    if (hideWithRelease && !visible) {
      child = null;
    }

    return (
      <CSSTransition
        transitionAppear
        transitionEnter
        transitionLeave
        component=""
        transitionName="zoom"
        visibleProps="visible"
        transitionAppearTimeout={300}
        transitionEnterTimeout={300}
        transitionLeaveTimeout={150}
        afterLeave={::this.handleAfterModalLeave}>
        {child}
      </CSSTransition>
    );
  }

  render() {
    const { prefix } = this.props;
    const { visible } = this.state;
    const modalWrapperPrefixCls = prefixer('modal-wrapper', prefix);

    const style = {};
    if (visible) {
      style.display = null;
    }

    return (
      <div
        ref="wrapper"
        style={style}
        className={modalWrapperPrefixCls}>
        {this.renderBackdropElement()}
        {this.renderModal()}
      </div>
    );
  }
}

Modal.propTypes = {
  prefix          : PropTypes.string,
  visible         : PropTypes.bool.isRequired,

  title           : PropTypes.string,
  confirm         : PropTypes.string,
  cancel          : PropTypes.string,

  closable        : PropTypes.bool,
  confirmable     : PropTypes.bool,
  cancelable      : PropTypes.bool,
  onConfirm       : PropTypes.func,
  onClose         : PropTypes.func,
  beforeClose     : PropTypes.func,

  pending         : PropTypes.bool,
  disabled        : PropTypes.bool,
  isDialog        : PropTypes.bool,

  style           : PropTypes['object'],
  hideWithRelease : PropTypes.bool,
  backdropClosable: PropTypes.bool,

  width           : PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
};

Modal.defaultProps = {
  visible         : false,

  title           : '提醒',
  confirm         : '确定',
  cancel          : '取消',

  closable        : true,
  confirmable     : true,
  cancelable      : true,
  onConfirm       : noop,
  onClose         : noop,
  beforeClose     : noop,

  pending         : false,
  disabled        : false,
  isDialog        : false,

  style           : {},
  backdropClosable: true,
  hideWithRelease   : false,
};
