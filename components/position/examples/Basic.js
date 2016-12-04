import React, { Component } from 'react';
import Position from '../index';

export default class Basic extends Component {

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
      inner: false,
    };
  }

  handleClick() {
    const length = this.supportedPosition.length + 1;
    const random = Math.floor(Math.random() * length);

    const position = this.supportedPosition[random];
    this.setState({ position });
  }

  handleInnerClick() {
    const random = Math.floor(Math.random() * 2);

    this.setState({
      inner: random,
    });
  }

  render() {
    const { position, inner } = this.state;

    return (
      <div className="eva-position">
        <button
          className="button"
          onClick={::this.handleClick}>
          随机触发相对位置
        </button>
        <button
          className="button inner-switch"
          onClick={::this.handleInnerClick}>
          随机inner切换
        </button>
        <Position position={position} inner={!!inner}>
          <div
            className="calendar">
          </div>
          <input
            className="datepicker" />
        </Position>
      </div>
    );
  }
}
