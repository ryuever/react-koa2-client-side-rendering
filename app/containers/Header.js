import React, { Component } from 'react';
export default class Header extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="ng-header">
        <span>问卷调查</span>
      </div>
    )
  }
}