import React from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory } from 'react-router'
import Routes from './routes';
import { Provider } from 'react-redux';
import './styles/main.css';
// import './styles/modules/_card.css';

import configureStore from './store';
const store = configureStore(/* initialState */);

render((
  <Provider store={store}>
    <Router history={browserHistory}>
      {Routes}
    </Router>
  </Provider>
), document.getElementById('app'))