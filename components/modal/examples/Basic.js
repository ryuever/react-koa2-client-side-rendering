import React, { Component } from 'react';
import Modal from '../index';

export default class Basic extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
    };
  }

  handleClose() {
    this.setState({
      visible: false,
    });
  }

  handleButtonClick() {
    this.setState({
      visible: true,
    });
  }

  render() {
    const { visible } = this.state;

    return (
      <div>
        <button
          style={{ margin: '100px', marginBottom: '1000px' }}
          className="button button-primary"
          onClick={::this.handleButtonClick}>Trigger Modal</button>
        <Modal
          style={{ zIndex: 10 }}
          hideWithRelease
          overlayClassName="modal"
          onClose={::this.handleClose}
          visible={visible}>
          <span>{`hello world !!! ${new Date()}`}</span>
        </Modal>
      </div>
    );
  }
}
