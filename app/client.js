import React from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory } from 'react-router'
import Routes from './routes';
import './styles/main.css';
// import './styles/modules/_card.css';

render((
  <Router history={browserHistory}>
    {Routes}
  </Router>
), document.getElementById('app'))