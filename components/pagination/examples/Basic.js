import React, { Component } from 'react';
import Pagination from '../index';

export default class Basic extends Component {
  onChange(value) {
    console.log('current page : ', value);
  }

  render() {
    return (
      <Pagination
        onChange={::this.onChange}
        total={100}/>
    );
  }
}
