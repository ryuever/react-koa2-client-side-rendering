import React, { Component } from 'react';
import Sidebar from './Sidebar';

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="gq-dashboard row">
        <section className="side-bar col-2">
          <Sidebar />
        </section>

        <section className="main col-10">
          {this.props.children}
        </section>
      </div>    
    )
  }
}