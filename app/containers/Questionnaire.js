import React, { Component } from 'react';
import Card from '../components/card';
import Profile from '../components/profile';
// import { request as api } from 'lib/request';
import fetch from 'isomorphic-fetch';

export default class Questionnaire extends Component {
  constructor(props) {
    super(props);
  }

  handleSubmit() {
    fetch("/v1/questionnaire", {
      method: 'POST',
      headers: {
        Accept: 'application/json', 
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'ma',
      })
    });
  }

  render() {
    return (
      <div className="ng-questionnaire">
        <Profile />
        <button onClick={::this.handleSubmit}>
          提交
        </button>
      </div>
    )
  }
}
