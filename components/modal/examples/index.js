import React, { Component } from 'react';
import { render } from 'react-dom';
import Basic from './Basic';

import 'wall-e';

class App extends Component {
  render() {
    return (
      <div className="eva-modal">
        <Basic />
      </div>
    );
  }
}

render(<App />, document.querySelector('#app'));
