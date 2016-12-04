import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Basic from './Basic';
import Inner from './Inner';

require('wall-e');
require('./style.css');

class App extends Component {
  render() {
    return (
      <div className="app-testing">
        <Inner />
        <Basic />
      </div>
    );
  }
}

ReactDOM.render(
  <App />,
  document.querySelector('#app')
);
