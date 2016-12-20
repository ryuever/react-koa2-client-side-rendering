import React, { Component } from 'react';
import { Link } from 'react-router';

export default class Sidebar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="quick-links">
        <div className="col-12">
          <Link to="/dashboard" className="link">
          类型
          </Link>
        </div>
      </div>
    )
  }
}