import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Basic from './Basic';
import Simple from './Simple';
import Flexible from './Flexible';
import Direction from './Direction';
import Toggle from './Toggle';
import Uncached from './Uncached';

import 'wall-e';
import './style.css';

class App extends Component {
  render() {
    return (
      <div className="eva-tab-testing">
        <Basic />
        <Flexible />
        <Direction />
        <Simple />
        <Toggle />
        <Uncached />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.querySelector('#app'));
