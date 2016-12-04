import React from 'react';
import { render } from 'react-dom';
import {
  browserHistory,
  Router,
  Route,
  Link,
  IndexRedirect,
} from 'react-router';

import Breadcrumb from '../index';
import { Icon } from '../../index';

import 'wall-e';
import '../style.css';

const Football = () => {
  return (
    <div>
      <h2>Basic Example</h2>
      <Breadcrumb>
        <Breadcrumb.Link href="#">
          <Icon name="home" />
          Home
        </Breadcrumb.Link>
        <Breadcrumb.Link href="#">Category</Breadcrumb.Link>
        <Breadcrumb.Link href="#">Sports</Breadcrumb.Link>
        <Breadcrumb.Link>
          <Icon name="football" />
          Sports
        </Breadcrumb.Link>
      </Breadcrumb>
    </div>
  );
};

const App = (props) => {
  return (
    <div className="eva-breadcrumb">
      <ul className="tab tab-full">
        <li className="tab-item"><Link to="/static/category">Category</Link></li>
        <li className="tab-item"><Link to="/static/category/1234">Sports</Link></li>
        <li className="tab-item"><Link to="/static/basic">Basic Example</Link></li>
      </ul>
      {props.children}
    </div>
  );
};

const Category = (props) => {
  return (
    <div>
      <h2>Breadcrumb</h2>
      <Breadcrumb {...props} />
      {props.children}
    </div>
  );
};

const Sports = ({ children }) => {
  return children;
};

render((
  <Router history={browserHistory}>
    <Route path="/static" breadcrumbName="Home" component={App}>
      <IndexRedirect to="/static/category" />
      <Route path="category" breadcrumbName="Category" component={Category}>
        <Route name="sports" path=":id" breadcrumbName="Sports id :id" component={Sports} />
      </Route>
      <Route path="basic" breadcrumbName="Basic example" component={Football}>
      </Route>
    </Route>
  </Router>
), document.getElementById('app'));
