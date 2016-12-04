/* eslint-disable */
import React from 'react'
import { render } from 'react-dom'
import { Router, Route, Link, browserHistory } from 'react-router'
import Menu from '../../Menu';

import 'wall-e';
import Dropdown from '../src/Dropdown';

const App = React.createClass({

  getOverlay() {
    return (
      <div className='select'>
        <Menu>
          <Menu.Item><Link to="about" >About</Link></Menu.Item>
          <Menu.Item><Link to="users" >Users</Link></Menu.Item>
        </Menu>
      </div>
    )
  },

  render() {
    return (
      <div className="select">
        <Dropdown
          overlay={this.getOverlay()}>
          <div className="select-control">
            <input type="text" placeholder="Select..." />
          </div>
        </Dropdown>
        {this.props.children}
      </div>
    )
  }
})
const About = React.createClass({
  render() {
    return <span>about</span>
  }
})

const Users = React.createClass({
  render() {
    return <span>Users</span>
  }
})

// Declarative route configuration (could also load this config lazily
// instead, all you really need is a single root route, you don't need to
// colocate the entire config).
render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <Route path="about" component={About}/>
      <Route path="users" component={Users} />
    </Route>
  </Router>
), document.getElementById('app'))
/* eslint-enable */
