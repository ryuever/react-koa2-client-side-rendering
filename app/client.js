import React from 'react';
import { render } from 'react-dom';
import { Router, Route, hashHistory } from 'react-router'
import Routes from './routes';

render((
  <Router history={hashHistory}>
    {Routes}
  </Router>
), document.getElementById('app'))