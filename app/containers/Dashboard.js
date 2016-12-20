import React, { Component } from 'react';
import Sidebar from './Sidebar';

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="gq-dashboard">
        <section className="side-bar">
          <Sidebar />
        </section>

        <section className="main">
          {this.props.children}
        </section>
      </div>    
    )
  }
}