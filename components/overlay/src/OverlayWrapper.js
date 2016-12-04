import React, { Component } from 'react';
import Position from '../../position';
import CSSTransition from '../../CSSTransition';
import OverlayInner from './OverlayInner';

export default class OverlayWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: props.visible,
    };
  }

  componentWillMount() {
    const { getTargetNode } = this.props;
    this.setState({
      targetNode: getTargetNode(),
    });
  }

  componentWillReceiveProps(nextProps) {
    const { visible } = nextProps;
    this.setState({
      visible,
    });
  }

  handleAfterLeave(node) {
    node.style.display = 'none';
  }

  render() {
    const {
      style, children, overlayClassName,
      positionProps, transitionProps,
    } = this.props;
    const { targetNode, visible } = this.state;

    const innerStyle = {};
    if (targetNode && targetNode !== document.body) {
      innerStyle.minWidth = targetNode.offsetWidth;
    }

    if (visible) {
      innerStyle.display = null;
    }

    return (
      <Position
        style={style}
        ref="source"
        {...positionProps}
        targetNode={targetNode}>
        <CSSTransition
          afterLeave={::this.handleAfterLeave}
          {...transitionProps}>
          <OverlayInner
            key="overlay"
            style={innerStyle}
            className={overlayClassName}
            visible={visible}>
            {children}
          </OverlayInner>
        </CSSTransition>
      </Position>
    );
  }
}
