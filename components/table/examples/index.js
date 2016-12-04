import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import LazyLoading from './LazyLoading';
// import FullData from './FullData';

import 'wall-e';
import '../style.css';

class App extends Component {
  render() {
    return (
      <div className="eva-tab-testing">
        <LazyLoading />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.querySelector('#app'));
