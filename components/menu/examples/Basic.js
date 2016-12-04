import React, { Component } from 'react';
import Menu from '../index';

export default class Basic extends Component {
  render() {
    return (
      <Menu>
        <Menu.Item><a href="#">cherry</a></Menu.Item>
        <Menu.Item><a href="#">Grapes</a></Menu.Item>
        <Menu.Item><a href="#">Cirtus</a></Menu.Item>
      </Menu>
    );
  }
}

export default Basic;
