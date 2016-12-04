import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import CSSTransitionChild from './CSSTransitionChild';
import ChildrenUtils from './ChildrenUtils';
import '../style.css';

export default class CSSTransition extends Component {
  static propTypes = {
    transitionName: PropTypes.string,

    transitionAppear: PropTypes.bool,
    transitionEnter: PropTypes.bool,
    transitionLeave: PropTypes.bool,
    transitionAppearTimeout: PropTypes.number,
    transitionEnterTimeout: PropTypes.number,
    transitionLeaveTimeout: PropTypes.number,

    afterLeave: PropTypes.func,
    afterEnter: PropTypes.func,
    afterAppear: PropTypes.func,

    component: PropTypes['any'],
    visibleProps: PropTypes.string,

    componentClassName: PropTypes.string,
    componentStyle: PropTypes['object'],
  };

  static defaultProps = {
    transitionAppear: false,
    transitionEnter: false,
    transitionLeave: false,

    component: 'span',
  };

  constructor(props) {
    super(props);

    this.keysToEnter = [];
    this.keysToLeave = [];
    this.currentlyTransitioningKeys = {};

    this.defaultKeyForOnlyChild = `css.transition.${Date.now()}`;
  }

  componentWillMount() {
    this.setState({
      childrenMapping: this.getChildMappingWithDefault(this.props.children),
    });
  }

  // 在最开始初始化的时候才进行performAppear
  componentDidMount() {
    const initialChildMapping = this.state.childrenMapping;
    for (const key in initialChildMapping) {
      if (initialChildMapping[key]) {
        this.performAppear(key);
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    const { visibleProps } = this.props;
    const nextChildren = nextProps.children;
    const nextChildMapping = this.getChildMappingWithDefault(nextChildren);
    const prevChildMapping = this.state.childrenMapping;
    const newChildrenMapping = ChildrenUtils.mergeChildren(prevChildMapping, nextChildMapping);

    for (const key in nextChildMapping) {
      if (nextChildMapping.hasOwnProperty(key)) {
        const nextChild = nextChildMapping[key];
        const prevChild = prevChildMapping[key];
        const hasPrev = !!prevChild;

        if (this.currentlyTransitioningKeys[key]) {
          continue;
        }

        if (!hasPrev) {
          this.keysToEnter.push(key);
          continue;
        }

        // visibleProps as the first condition filter.
        if (visibleProps) {
          if (!prevChild.props[visibleProps] && nextChild.props[visibleProps]) {
            this.keysToEnter.push(key);
          }
        }
      }
    }

    for (const key in prevChildMapping) {
      if (prevChildMapping.hasOwnProperty(key)) {
        const prevChild = prevChildMapping[key];
        const nextChild = nextChildMapping[key];
        const hasNext = !!nextChild;

        if (this.currentlyTransitioningKeys[key]) {
          continue;
        }

        if (!hasNext) {
          this.keysToLeave.push(key);
        }

        if (visibleProps) {
          if (prevChild.props[visibleProps] && (!nextChild || !nextChild.props[visibleProps])) {
            this.keysToLeave.push(key);
            continue;
          }
        }
      }
    }

    this.setState({
      childrenMapping: newChildrenMapping,
    });
  }

  componentDidUpdate() {
    const keysToEnter = this.keysToEnter;
    this.keysToEnter = [];
    keysToEnter.forEach(::this.performEnter);

    const keysToLeave = this.keysToLeave;
    this.keysToLeave = [];
    keysToLeave.forEach(::this.performLeave);
  }

  getChildMappingWithDefault(children) {
    const options = {
      defaultKey: this.defaultKeyForOnlyChild,
    };

    return ChildrenUtils.getChildMapping(children, options);
  }

  performAppear(key) {
    this.currentlyTransitioningKeys[key] = true;

    const component = this.refs[key];
    if (component.componentWillAppear) {
      component.componentWillAppear(
        this._handleDoneAppearing.bind(this, key)
      );
    } else {
      this._handleDoneAppearing(key);
    }
  }

  performEnter(key) {
    this.currentlyTransitioningKeys[key] = true;
    const component = this.refs[key];

    if (component.componentWillEnter) {
      component.componentWillEnter(
        this._handleDoneEntering.bind(this, key)
      );
    } else {
      this._handleDoneEntering(key);
    }
  }

  performLeave(key) {
    this.currentlyTransitioningKeys[key] = true;

    const component = this.refs[key];

    if (component.componentWillLeave) {
      component.componentWillLeave(this._handleDoneLeaving.bind(this, key));
    } else {
      this._handleDoneLeaving(key);
    }
  }

  _handleDoneAppearing = (key) => {
    const { visibleProps } = this.props;

    const component = this.refs[key];
    if (component.componentDidAppear) {
      component.componentDidAppear();
    }
    delete this.currentlyTransitioningKeys[key];

    const { afterAppear } = this.props;
    if (afterAppear) {
      const node = ReactDOM.findDOMNode(this.refs[key]);
      afterAppear(node);
    }

    const currentChildMapping = this.getChildMappingWithDefault(this.props.children);
    const options = { currentChildMapping, key, visibleProps };

    if (ChildrenUtils.willLeave(options)) {
      this.performLeave(key);
    }
  }

  _handleDoneEntering = (key) => {
    const { visibleProps } = this.props;

    const component = this.refs[key];
    if (component.componentDidEnter) {
      component.componentDidEnter();
    }
    delete this.currentlyTransitioningKeys[key];

    const { afterEnter } = this.props;
    if (afterEnter) {
      const node = ReactDOM.findDOMNode(this.refs[key]);
      afterEnter(node);
    }
    const currentChildMapping = this.getChildMappingWithDefault(this.props.children);
    const options = { currentChildMapping, key, visibleProps };
    if (ChildrenUtils.willLeave(options)) {
      this.performLeave(key);
    }
  };

  _handleDoneLeaving = (key) => {
    const { visibleProps } = this.props;
    const component = this.refs[key];

    if (component.componentDidLeave) {
      component.componentDidLeave();
    }

    delete this.currentlyTransitioningKeys[key];
    const { afterLeave } = this.props;

    const currentChildMapping = this.getChildMappingWithDefault(this.props.children);
    const options = { currentChildMapping, key, visibleProps };

    if (ChildrenUtils.willEnter(options)) {
      this.performEnter(key);
    } else {
      if (afterLeave) {
        const node = ReactDOM.findDOMNode(this.refs[key]);
        afterLeave(node);
      }
      this.setState((state) => {
        const newChildrenMapping = Object.assign({}, state.childrenMapping);
        if (!currentChildMapping[key]) {
          delete newChildrenMapping[key];
        }
        return { childrenMapping: newChildrenMapping };
      });
    }
  };

  render() {
    const { childrenMapping } = this.state;
    const childrenToRender = [];

    const {
      transitionName,
      transitionAppear,
      transitionEnter,
      transitionLeave,
      transitionAppearTimeout,
      transitionEnterTimeout,
      transitionLeaveTimeout,
      componentClassName,
      componentStyle,
      component,
    } = this.props;

    for (const key in childrenMapping) {
      const child = childrenMapping[key];
      if (childrenMapping.hasOwnProperty(key)) {
        if (child) {
          childrenToRender.push(
            <CSSTransitionChild
              key={key}
              ref={key}
              transitionName={transitionName}
              transitionAppear={transitionAppear}
              transitionEnter={transitionEnter}
              transitionLeave={transitionLeave}
              transitionAppearTimeout={transitionAppearTimeout}
              transitionEnterTimeout={transitionEnterTimeout}
              transitionLeaveTimeout={transitionLeaveTimeout}>
              {child}
            </CSSTransitionChild>
          );
        }
      }
    }

    // Do not forward ReactTransitionGroup props to primitive DOM nodes
    const props = Object.assign({}, this.props, {
      className: componentClassName,
      style: componentStyle,
    });

    delete props.transitionLeave;
    delete props.transitionName;
    delete props.transitionAppear;
    delete props.transitionEnter;
    delete props.transitionLeaveTimeout;
    delete props.transitionEnterTimeout;
    delete props.transitionAppearTimeout;
    delete props.component;
    delete props.componentClassName;
    delete props.componentStyle;

    delete props.afterLeave;
    delete props.afterAppear;
    delete props.afterEnter;
    delete props.visibleProps;

    // when component props is empty, there is no need to be wrapped in tag.
    if (!component) {
      return childrenToRender[0] || null;
    }

    return React.createElement(
      this.props.component,
      props,
      childrenToRender
    );
  }
}
