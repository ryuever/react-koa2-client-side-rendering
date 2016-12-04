import React from 'react';
import { render } from 'react-dom';
import Basic from './Basic';

import 'wall-e';

const App = () => {
  return (
    <div className="select">
      <Basic />
    </div>
  );
};

render(<App />, document.querySelector('#app'));
