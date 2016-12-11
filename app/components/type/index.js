import React, { Component } from 'react';
import { Card, Button, Modal } from 'react-eva';
import * as actions from 'actions/type';
import AddForm from './AddForm';

export default class Type extends Component {
  constructor(props) {
    super(props);
  }

  openCreateModal() {
    this.props.dispatch(actions.openCreateModal());
  }

  handleAddFormSubmit() {
    const { type: {
      editValues: { name, description, language },
    }} = this.props;

    this.props.dispatch(actions.submitType({
      name, description, language,
    }));
  }

  renderCreateModal() {
    const { type: { createModalVisible } } = this.props;

    return (
      <Modal
        width={500}
        hideWithRelease
        title="创建新的类型"
        onConfirm={::this.handleAddFormSubmit}
        visible={createModalVisible}>
        <AddForm {...this.props} />
      </Modal>
    )
  }

  render() {
    return (
      <Card title="类型列表"
        extra={
          <Button
            onClick={::this.openCreateModal} 
            type="primary" 
            size="sm">
            添加类型
          </Button>
        }>
        {this.renderCreateModal()}
      </Card>
    )
  }
}