import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/App';
import Questionnaire from './containers/Questionnaire';

const routes = (
  <Route path="/" component={App}>
    <IndexRoute component={Questionnaire} />
  </Route>
);
export default routes;
