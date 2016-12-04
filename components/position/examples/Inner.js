import React, { Component } from 'react';
import Position from '../index';

export default class Inner extends Component {

  constructor(props) {
    super(props);

    this.supportedPosition = [
      'left, top', 'left, center', 'left, bottom',
      'top, left', 'top, center', 'top, right',
      'right, top', 'right, center', 'right, bottom',
      'bottom, left', 'bottom, center', 'bottom, right',
      'center, center',
    ];
    this.state = {
      position: 'bottom, left',
    };
  }

  handleClick() {
    const length = this.supportedPosition.length + 1;
    const random = Math.floor(Math.random() * length);

    const position = this.supportedPosition[random];
    this.setState({ position });
  }

  render() {
    return (
      <div className="eva-position-inner">
        <button
          className="button"
          onClick={::this.handleClick}>
          随机触发Inner相对位置
        </button>
        <Position position={this.state.position} inner>
          <div
            className="calendar">
          </div>
        </Position>
      </div>
    );
  }
}
