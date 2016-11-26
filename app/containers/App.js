import React, { Component } from 'react';
import { Link } from 'react-router';

export default class App extends Component {
  render() {
    const { children } = this.props;

    return (
      <div>
        <Link to="/about">React + Koa2 + webpack + HMR + Babel + ES6</Link>
        {children}
      </div>
    );
  }
}
