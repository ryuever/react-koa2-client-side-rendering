import React, { Component, PropTypes } from 'react';
import RenderIntoContainer from 'react-eva/utils/RenderIntoContainer';
import Modal from './Modal';
import '../style.css';

export default class ModalWrapper extends Component {
  static propTypes = {
    prefix: PropTypes.string,
    style: PropTypes['object'],

    transitionProps: PropTypes['object'],
  }

  constructor(props) {
    super(props);
    this.triggerPosition = {};
  }

  componentDidMount() {
    document.documentElement.addEventListener('click', (e) => {
      this.triggerPosition = {
        left: e.clientX,
        top: e.clientY,
      };
    });
  }

  renderChildren() {
    const { children, ...restProps } = this.props;
    delete restProps['transitionProps'];

    return (
      <Modal
        triggerPosition={this.triggerPosition}
        {...restProps}>
        {children}
      </Modal>
    );
  }

  render() {
    const { visible } = this.props;
    return (
      <RenderIntoContainer
        visible={visible}
        parentComponent={this}
        appendedElement={this.renderChildren()}/>
    );
  }
}
