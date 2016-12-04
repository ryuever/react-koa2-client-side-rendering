import React, { Component, PropTypes } from 'react';
import Overlay from '../../overlay';

export default class Dropdown extends Component {
  static propTypes = {
    prefix: PropTypes.string,
    delay: PropTypes.number,
    style: PropTypes['object'],

    positionProps: PropTypes['object'],
    transitionProps: PropTypes['object'],
  }

  static defaultProps = {
    delay: 250,
    trigger: 'hover',
  }

  constructor(props) {
    super(props);

    this.defaultPositionProps = {
      position: 'bottom, left',
    };

    this.defaultTransitionProps = {
      transitionName: 'dropdown',

      transitionAppear: true,
      transitionEnter: true,
      transitionLeave: true,
      transitionAppearTimeout: 300,
      transitionEnterTimeout: 300,
      transitionLeaveTimeout: 150,

      visibleProps: 'visible',
    };
  }

  render() {
    const {
      positionProps,
      transitionProps,
      ...restProps
    } = this.props;

    const mergedPositionProps = Object.assign({},
      this.defaultPositionProps, positionProps
    );
    const mergedTransitionProps = Object.assign({},
      this.defaultTransitionProps, transitionProps
    );

    return (
      <Overlay
        {...restProps}
        positionProps={mergedPositionProps}
        transitionProps={mergedTransitionProps}>
        {this.props.children}
      </Overlay>
    );
  }
}
