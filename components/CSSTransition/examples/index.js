import React, { Component } from 'react';
import { render } from 'react-dom';
import CSSTransition from '../index';
import Outer from './Outer';

import './style.css';

class Transition extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
    };
  }

  handleClick() {
    this.setState({
      visible: !this.state.visible,
    });
  }

  handleAfterLeave(node) {
    node.style.display = 'none';
  }

  render() {
    const { visible } = this.state;

    let classes = '';
    if (!visible) {
      classes = 'hidden';
    }

    return (
      <div>
        <button className="button"
          onClick={::this.handleClick}>
          Swtich
        </button>
        <CSSTransition
          transitionName="example"
          transitionAppearTimeout={250}
          transitionEnterTimeout={250}
          transitionLeaveTimeout={200}
          afterLeave={::this.handleAfterLeave}
          transitionProps="visible">
          <Outer
            key="outer"
            visible={visible}>
            <span
              className={classes}
              key="ce">Testing</span>
          </Outer>
        </CSSTransition>
      </div>
    );
  }
}

render(<Transition />, document.querySelector('#app'));
