import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from 'containers/App';
import Questionnaire from 'containers/Questionnaire';
import Dashboard from 'containers/Dashboard';
import Type from 'containers/Type';
import TypeDetail from 'containers/TypeDetail';
import Option from 'containers/Option';
import Question from 'containers/Question';

const routes = (
  <Route path="/" component={App}>
    <IndexRoute component={Questionnaire} />
    <Route path="dashboard" component={Dashboard}>
      <IndexRoute component={Type} />
      <Route path="type/:typeId">
        <IndexRoute component={TypeDetail} />
        <Route path="options" component={Option} />
        <Route path="questions" component={Question} />        
      </Route>
    </Route>
  </Route>
);
export default routes;
