import React, { Component, PropTypes } from 'react';
import RenderIntoContainerWrapper from './RenderIntoContainerWrapper';
import ReactDOM from 'react-dom';
import OverlayWrapper from './OverlayWrapper';

export default class Overlay extends Component {
  static propTypes = {
    prefix: PropTypes.string,
    trigger: PropTypes.oneOf(['click', 'hover']).isRequired,

    positionProps: PropTypes['object'],
    transitionProps: PropTypes['object'],

    clickToDisappear: PropTypes.bool,
    hoverToDisappear: PropTypes.bool,
    clickToDisplay: PropTypes.bool,
    hoverToDisplay: PropTypes.bool,

    overlayClassName: PropTypes.string,
  }

  static defaultProps = {
    delay: 200,
    escToDismiss: true,
  };

  constructor(props) {
    super(props);
    const { visible } = props;

    this.state = {
      visible,
    };

    this.timerId = null;

    this.defaultPositionProps = {
      position: 'bottom, left',
    };
  }

  componentDidMount() {
    this._mounted = true;
  }

  componentWillReceiveProps(nextProps) {
    const { visible } = nextProps;
    const state = {};

    if (nextProps.hasOwnProperty('visible')) {
      state.visible = visible;
    }

    this.setState(state);
  }

  componentWillUnmount() {
    this._mounted = false;
  }

  clearTimer() {
    if (this.timerId) {
      clearTimeout(this.timerId);
      this.timerId = null;
    }
  }

  setVisible(visible) {
    const { delay } = this.props;

    if (!this._mounted) {
      return;
    }

    if (delay) {
      this.timerId = setTimeout(() => {
        clearTimeout(this.timerId);
        if (!this._mounted) {
          return;
        }
        this.setState({ visible });
      }, delay);
    } else {
      this.setState({ visible });
    }
  }

  onMouseEnter() {
    const { visible } = this.state;
    this.clearTimer();

    if (visible) {
      return;
    }
    this.setVisible(true);
  }

  onMouseLeave() {
    const { visible } = this.state;
    this.clearTimer();

    if (!visible) {
      return;
    }

    this.setVisible(false);
  }

  onClick(e) {
    e.stopPropagation();
    const { visible } = this.state;
    const sourceNode = ReactDOM.findDOMNode(this.refs.source);
    const targetNode = ReactDOM.findDOMNode(this);

    if (!visible) {
      this.setVisible(true);
    } else {
      if (e.target === sourceNode || e.target === targetNode) {
        return;
      }
      this.setVisible(false);
    }
  }

  getTargetNode() {
    return ReactDOM.findDOMNode(this) || document.body;
  }

  mergeEvent(type, e) {
    const { children } = this.props;
    const childEventHandler = children.props[type];
    if (childEventHandler) {
      childEventHandler(e);
    }

    if (this[type]) {
      this[type](e);
    }
  }

  delayMouseEvent(type, e) {
    this.mergeEvent(type, e);
  }

  delayMouseEnter() {
    const { visible } = this.state;
    clearTimeout(this.mouseEventTimerId);

    if (visible) {
      return;
    }

    this.delayMouseEvent('onMouseEnter');
  }

  delayMouseLeave() {
    const { visible } = this.state;
    clearTimeout(this.mouseEventTimerId);

    if (!visible) {
      return;
    }

    this.delayMouseEvent('onMouseLeave');
  }

  renderAppendedElement() {
    const {
      style, overlay, overlayClassName,
      positionProps, transitionProps,
    } = this.props;
    const { visible } = this.state;

    const mergedPositionProps = Object.assign({},
      this.defaultPositionProps, positionProps
    );
    const mergedTransitionProps = Object.assign({},
      this.defaultTransitionProps, transitionProps
    );

    const mouseEvents = {};
    mouseEvents.onMouseEnter = ::this.onMouseEnter;

    if (this.isLeaveToDisappear()) {
      mouseEvents.onMouseLeave = ::this.onMouseLeave;
    }

    if (this.isClickToDisappear()) {
      mouseEvents.onClick = ::this.onClick;
    }

    return (
      <OverlayWrapper
        ref="source"
        style={style}
        visible={visible}
        overlayClassName={overlayClassName}
        positionProps={mergedPositionProps}
        transitionProps={mergedTransitionProps}
        getTargetNode={this.getTargetNode.bind(this)}>
        {
          React.cloneElement(overlay, { ...mouseEvents })
        }
      </OverlayWrapper>
    );
  }

  isClickToDisplay() {
    const { trigger, clickToDisplay } = this.props;
    if (this.props.hasOwnProperty('clickToDisplay')) {
      return clickToDisplay;
    }
    return trigger === 'click';
  }
  isHoverToDisplay() {
    const { trigger, hoverToDisplay } = this.props;
    if (this.props.hasOwnProperty('hoverToDisplay')) {
      return hoverToDisplay;
    }
    return trigger === 'hover';
  }
  isClickToDisappear() {
    const { trigger, clickToDisappear } = this.props;
    if (this.props.hasOwnProperty('clickToDisappear')) {
      return clickToDisappear;
    }
    return trigger === 'hover';
  }
  isLeaveToDisappear() {
    const { trigger, leaveToDisappear } = this.props;
    if (this.props.hasOwnProperty('leaveToDisappear')) {
      return leaveToDisappear;
    }
    return trigger === 'hover' || trigger === 'click';
  }

  renderTarget() {
    const children = this.props.children;
    const { visible }  = this.state;

    const mouseEvents = {};
    if (this.isClickToDisplay()) {
      mouseEvents.onClick = ::this.onClick;
    }

    if (this.isHoverToDisplay()) {
      mouseEvents.onMouseEnter = ::this.onMouseEnter;
      if (this.isLeaveToDisappear()) {
        mouseEvents.onMouseLeave = ::this.onMouseLeave;
      }
    }

    const conceptualChild = (
      <RenderIntoContainerWrapper
        key="container-wrapper"
        parentComponent={this}
        appendedElement={this.renderAppendedElement()}
        visible={visible} />
    );

    if (children) {
      return React.cloneElement(children, {
        ...mouseEvents,
      }, [children.props.children, conceptualChild]);
    }

    return conceptualChild;
  }

  render() {
    return this.renderTarget();
  }
}
