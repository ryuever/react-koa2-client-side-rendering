import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from 'containers/App';
import Questionnaire from 'containers/Questionnaire';
import Dashboard from 'containers/Dashboard';
import Type from 'containers/Type';

const routes = (
  <Route path="/" component={App}>
    <IndexRoute component={Questionnaire} />
    <Route path="/dashboard" component={Dashboard}>
      <IndexRoute component={Type} />
    </Route>
  </Route>
);
export default routes;
