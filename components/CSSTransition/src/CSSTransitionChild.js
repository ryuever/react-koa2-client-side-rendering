import { Component } from 'react';
import ReactDOM from 'react-dom';
const TICK = 17;

export default class CSSTransitionChild extends Component {
  constructor(props) {
    super(props);

    this._isMount = false;

    this.classNameAndNodeQueue = [];
    this.transitionTimeouts = [];
  }

  componentDidMount() {
    this._isMount = true;
  }

  componentWillUnmount() {
    this._isMount = false;
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
    this.transitionTimeouts.forEach((timeout) => {
      clearTimeout(timeout);
    });

    this.classNameAndNodeQueue.length = 0;
  }

  componentWillAppear(done) {
    const { transitionAppear, transitionAppearTimeout } = this.props;

    if (transitionAppear) {
      this.transition('appear', done, transitionAppearTimeout);
    } else {
      done();
    }
  }

  componentWillEnter(done) {
    const { transitionEnter, transitionEnterTimeout } = this.props;

    if (transitionEnter) {
      this.transition('enter', done, transitionEnterTimeout);
    } else {
      done();
    }
  }

  componentWillLeave(done) {
    const { transitionLeave, transitionLeaveTimeout } = this.props;
    if (transitionLeave) {
      this.transition('leave', done, transitionLeaveTimeout);
    } else {
      done();
    }
  }

  transition(animationType, finishCallback, userSpecifiedDelay) {
    const node = ReactDOM.findDOMNode(this);

    if (!node) {
      if (finishCallback) {
        finishCallback();
      }
      return;
    }

    const className = `${this.props.transitionName}-${animationType}`;
    const activeClassName = `${className}-active`;

    let timeout = null;

    const endListener = () => {
      clearTimeout(timeout);
      node.classList.remove(className);
      node.classList.remove(activeClassName);
      // Usually this optional callback is used for informing an owner of
      // a leave animation and telling it to remove the child.
      if (finishCallback) {
        finishCallback();
      }
    };

    node.classList.add(className);

    // Need to do this to actually trigger a transition.
    this.queueClassAndNode(activeClassName, node);

    // If the user specified a timeout delay.
    if (userSpecifiedDelay) {
      // Clean-up the animation after the specified delay
      timeout = setTimeout(endListener, userSpecifiedDelay);
      this.transitionTimeouts.push(timeout);
    }
  }

  queueClassAndNode(className, node) {
    this.classNameAndNodeQueue.push({
      className,
      node,
    });

    if (!this.timeout) {
      this.timeout = setTimeout(::this.flushClassNameAndNodeQueue, TICK);
    }
  }

  flushClassNameAndNodeQueue() {
    if (this._isMount) {
      this.classNameAndNodeQueue.forEach((obj) => {
        obj.node.classList.add(obj.className);
      });
    }

    this.classNameAndNodeQueue.length = 0;
    this.timeout = null;
  }

  render() {
    return this.props.children;
  }
}
