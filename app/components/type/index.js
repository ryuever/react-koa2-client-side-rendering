import React, { Component } from 'react';
import { Card, Button, Modal, Table } from 'react-eva';
import * as actions from 'actions/type';
import AddForm from './AddForm';

export default class Type extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.dispatch(actions.queryTypes());
  }

  componentWillReceiveProps(nextProps) {
    const { type: { submitTypeStatus: nextSubmitTypeStatus } } = nextProps;
    const { type: { submitTypeStatus } } = this.props;

    if (submitTypeStatus === 'pending' && nextSubmitTypeStatus === 'success') {
      this.props.dispatch(actions.queryTypes());
    };
  }

  openCreateModal() {
    this.props.dispatch(actions.openCreateModal());
  }

  handleAddFormSubmit() {
    const { 
      type: {
        editValues: { name, description, language },
      },
    } = this.props;

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

  renderTable() {
    const columnData = [{
      key: 'name',
      title: 'name',
    }, {
      key: 'language',
      title: 'supported Language',
    }, {
      key: 'description',
      title: 'description',
    }];
    
    const { type : { types } } = this.props;

    if (!types || types.length === 0) {
      return null;
    }

    const rawData = [];
    types.forEach(type => {
      const { description, name, supportedLanguages } = type;
      rawData.push({
        description, name,
        language: supportedLanguages.join(', '),
      });
    });

    return (
      <Table rawData={rawData} columnData={columnData} />
    );
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
        {this.renderTable()}
        {this.renderCreateModal()}
      </Card>
    )
  }
}