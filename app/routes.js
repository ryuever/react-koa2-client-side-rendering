import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from 'containers/App';
import Questionnaire from 'containers/Questionnaire';
import Dashboard from 'containers/Dashboard';

const routes = (
  <Route path="/" component={App}>
    <IndexRoute component={Questionnaire} />
    <Route path="/dashboard" component={Dashboard}>
    </Route>
  </Route>
);
export default routes;
