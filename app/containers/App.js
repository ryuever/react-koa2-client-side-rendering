import React, { Component } from 'react';
import { Link } from 'react-router';

export default class App extends Component {
  render() {
    const { children } = this.props;

    return (
      <div>
        <Link to="/about">React + Express + Babel + HMR</Link>
        {children}
      </div>
    );
  }
}