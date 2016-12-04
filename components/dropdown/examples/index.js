import { render } from 'react-dom';
import React from 'react';
import Dropdown from '../index';

import './style.css';
import 'wall-e';

const App = () => {
  const getOverlay = () => {
    return (
      <div className="overlay-list">
        <ul>
          <li>happy tree, happy friends !!!</li>
          <li>happy tree, happy friends !!!</li>
          <li>happy tree, happy friends !!!</li>
          <li>happy tree, happy friends !!!</li>
          <li>happy tree, happy friends !!!</li>
        </ul>
      </div>
    );
  };

  return (
    <div className="dropdown-container">
      <div className="layer-1">
        <div className="dropdown-back">
          <div className="select">
            <Dropdown
              positionProps={{
                position: 'right, top',
                margin: 10,
              }}
              clickToDisappear={false}
              style={{ zIndex : 100 }}
              overlay={getOverlay()}>
              <div className="select-control">
                <input type="text" placeholder="Select..." />
              </div>
            </Dropdown>
          </div>
        </div>
        <div className="dropdown-extra">
        </div>
      </div>
      <div className="layer-2">
      </div>
    </div>
  );
};
render(<App />, document.querySelector('#app'));

// <div className="select-control">
//   <input type="text" placeholder="Select..." />
// </div>
