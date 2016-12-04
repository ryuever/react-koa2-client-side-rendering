import React, { Component, PropTypes, Children } from 'react';
import ReactDOM from 'react-dom';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {
  getNodeOffset,
  getNodeSize,
  getViewportPosition,
  getzIndexStyle,
} from 'react-eva/utils/nodeProperties';

export default class Position extends Component {
  constructor(props) {
    super(props);

    const {
      position,
      inner,
      targetNode,
    } = props;

    this.state = {
      position,
      inner,
    };

    this.targetNode = targetNode || document.body;
    this.sourceNode = '';

    this.shouldComponentUpdate = ::PureRenderMixin.shouldComponentUpdate;
  }

  componentDidMount() {
    const { position, alignable } = this.props;

    if (!alignable) {
      return;
    }

    this.sourceNode = ReactDOM.findDOMNode(this);
    const responsivePosition = this.adjustPosition(position) || position;

    /* eslint-disable */
    this.setState({position: responsivePosition});
    /* eslint-enable */
  }

  componentWillReceiveProps(nextProps) {
    const {
      inner,
      targetNode,
      position,
      alignable,
    } = nextProps;

    if (!alignable) {
      return;
    }

    if (targetNode) {
      this.targetNode = targetNode || document.body;
    }
    const responsivePosition = this.adjustPosition(position) || position;

    this.setState({
      inner,
      position: responsivePosition,
    });
  }

  /*
   * In case, the source node size is required, but it is not rendered
   * till componentDidUpdate (eg: position props begin with left or top)
  */
  componentDidUpdate() {
    if (!this.props.alignable) {
      return;
    }

    const style = this.updateStyle();

    const { top, left, position, zIndex } = style;

    this.sourceNode.style.top = top;
    this.sourceNode.style.left = left;
    this.sourceNode.style.position = position;
    this.sourceNode.style.zIndex = zIndex;
  }

  parsePosition(position) {
    const positions = position.split(',');

    return [positions[0].trim(), positions[1].trim()];
  }

  locate(position) {
    const { inner } = this.state;
    const { margin } = this.props;

    let LocTop = 0;
    let LocLeft = 0;
    let LocBottom = 0;
    let LocRight = 0;
    let targetSize = {};
    const [coorX, coorY] = this.parsePosition(position);

    this.targetPosition = getNodeOffset(this.targetNode);
    const { left, top, right, bottom } = this.targetPosition;

    targetSize = getNodeSize(this.targetNode);

    const elementSize = getNodeSize(this.sourceNode);
    const elementHeight = elementSize.height;
    const elementWidth = elementSize.width;
    const targetHeight = targetSize.height;
    const targetWidth = targetSize.width;

    /* eslint-disable default-case */
    switch (coorX) {
      case 'top':
        if (inner) {
          LocTop = top + margin;
          LocBottom = top + elementHeight + margin;
        } else {
          LocTop = top - elementHeight - margin;
          LocBottom = top - margin;
        }
        break;
      case 'bottom':
        if (inner) {
          LocTop = bottom - elementHeight - margin;
          LocBottom = bottom - margin;
        } else {
          LocTop = bottom + margin;
          LocBottom = bottom + elementHeight + margin;
        }
        break;
      case 'left':
        if (inner) {
          LocLeft = left + margin;
          LocRight = left + elementWidth + margin;
        } else {
          LocLeft = left - elementWidth - margin;
          LocRight = left - margin;
        }
        break;
      case 'right':
        if (inner) {
          LocLeft = right - elementWidth - margin;
          LocRight = right - margin;
        } else {
          LocLeft = right + margin;
          LocRight = right + elementWidth + margin;
        }
        break;
    }

    switch (coorY) {
      case 'top':
        LocTop = top;
        LocBottom = top + elementHeight;
        break;
      case 'bottom':
        LocTop = bottom;
        LocBottom = bottom + elementHeight;
        break;
      case 'left':
        LocLeft = left;
        LocRight = left + elementWidth;
        break;
      case 'right':
        LocLeft = right;
        LocRight = right + elementWidth;
        break;
      case 'center':
        if (coorX === 'top' || coorX === 'bottom' || coorX === 'center') {
          LocLeft = left + targetWidth / 2 - elementWidth / 2;
          LocRight = left + targetWidth / 2 + elementWidth / 2;
        }
        if (coorX === 'left' || coorX === 'right' || coorX === 'center') {
          LocTop = top + targetHeight / 2 - elementHeight / 2;
          LocBottom = top + targetHeight / 2 + elementHeight / 2;
        }
        break;
    }
    /* eslint-enable */
    return {
      LocLeft,
      LocTop,
      LocRight,
      LocBottom,
    };
  }

  adjustPosition(position) {
    const { inner } = this.state;

    if (!this.sourceNode || !this.targetNode) {
      return null;
    }

    const viewportPosition = getViewportPosition();
    const sourcePosition = this.locate(position);

    const { left, top, right, bottom } = viewportPosition;
    const { LocLeft, LocTop, LocRight, LocBottom } = sourcePosition;

    const [coorX] = this.parsePosition(position);
    let state = position;

    if (!inner && coorX !== 'center') {
      if (left >= LocLeft) {
        if (coorX === 'left') {
          state = state.replace('left', 'right');
        }
      }

      if (right <= LocRight) {
        if (coorX === 'right') {
          state = state.replace('right', 'left');
        }
      }

      if (bottom <= LocBottom) {
        if (coorX === 'bottom') {
          state = state.replace('bottom', 'top');
        }
      }

      if (top >= LocTop) {
        if (coorX === 'top') {
          state = state.replace('top', 'bottom');
        }
      }
    }

    return state;
  }

  updateStyle() {
    const { position } = this.state;
    const coordinate = this.locate(position);
    const { LocTop, LocLeft } = coordinate;

    const zIndex = getzIndexStyle(this.targetNode);
    return {
      top: `${LocTop}px`,
      left: `${LocLeft}px`,
      position: 'absolute',
      zIndex,
    };
  }

  _updatePosition() {
    if (!this.sourceNode || !this.props.alignable) {
      return null;
    }
    return this.updateStyle();
  }

  renderSource() {
    const { children, style } = this.props;

    const position = this._updatePosition() || {};
    return React.cloneElement(children, {
      key: 'source',
      style: Object.assign({}, position, style),
    });
  }

  render() {
    return this.renderSource();
  }
}

/* eslint-disable consistent-return */
const childrenPropType = ({ children }, propName, componentName) => {
  const childCount = Children.count(children);
  if (childCount <= 0) {
    return new Error(
      `${componentName} expects at least one child to`
      + ' use as the target element.'
    );
  } else if (childCount > 2) {
    return new Error(`Only a max of two children allowed in ${componentName}.`);
  }
};
/* eslint-enable */

Position.propTypes = {
  prefix: PropTypes.string,
  inner: PropTypes.bool,
  children: childrenPropType,
  alignable: PropTypes.bool,
  margin: PropTypes.number,
  position: PropTypes.oneOf([
    'left, top', 'left, center', 'left, bottom',
    'top, left', 'top, center', 'top, right',
    'right, top', 'right, center', 'right, bottom',
    'bottom, left', 'bottom, center', 'bottom, right',
    'center, center',
  ]),
};

Position.defaultProps = {
  position: 'bottom, left',
  inner: false,
  alignable: true,
  margin: 0,
};
