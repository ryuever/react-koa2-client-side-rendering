import React, { Component } from 'react';
import { Card, Button, Table } from 'react-eva';
import { Router, Link } from 'react-router';
import * as actions from 'actions/type';
import * as optionActions from 'actions/option';
export default class TypeDetail extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const { 
      type: { types },
      option: { defaultOptions },
      params: { typeId },      
      dispatch,
    } = this.props;
    dispatch(actions.setCurrentTypeId(typeId));

    if (!types) {
      dispatch(actions.queryTypes());
    }

    if (!defaultOptions) {
      dispatch(optionActions.queryOptions(typeId));
    }
  }

  componentWillReceiveProps(nextProps) {
    const { 
      type: { deleteTypeStatus: nextDeleteTypeStatus },
      router,
    } = nextProps;

    const { type: { deleteTypeStatus } } = this.props;

    if (deleteTypeStatus === 'pending' && nextDeleteTypeStatus === 'success') {
      alert('删除成功');
      router.push({
        pathname: '/dashboard',
      })
    } 
  }

  handleClick(id) {
    this.props.dispatch(actions.deleteType(id));
  }

  renderContent(type) {
    const concernedKeys = ['description', 'name', 'supportedLanguages'];
    return concernedKeys.map(key =>
      <div className="row" key={key}>
        <div className="col-3">
          {key}
        </div>
        <div className="col-9">
          { key === 'supportedLanguages' ? type[key].join(', ') : type[key] }
        </div>
      </div>
    );    
  }

  redirectToEdit() {
    const { 
      params: { typeId },
    } = this.props;
    return (
  <Link to={`/dashboard/type/${typeId}/options`}>编辑默认值</Link>
    );
  }

  renderOptions() {
    const { 
      option: { defaultOptions },
      type: { currentType: { supportedLanguages } },
    } = this.props;
    
    if (!defaultOptions || defaultOptions.length === 0) {
      return null;
    }

    const columnData = supportedLanguages.map((language) => ({
      key: language.trim(),
      title: language,
    }));

    let rawData = [];

    defaultOptions.forEach((option) => {
      const content = option.content;
      rawData.push(content.reduce((prev, next) => ({
        ...prev,
        [`${next.language}`]: next.description,
      }), {}));
    });

    return (
      <Card 
        title="默认值选项"
        extra={this.redirectToEdit()}>
        <Table rawData={rawData} columnData={columnData} />
      </Card>
    );
  }

  renderFoot(type) {
    const { _id } = type;
    return (
      <Button
        type="primary"
        onClick={this.handleClick.bind(this, _id)}>
        删除当前类型
      </Button>
    )
  }

  render() {
    const { 
      type: { types },
      params: { typeId },
      router,
    } = this.props;

    if (!types) {
      return null;
    }

    const len = types.length;
    let data = '';    

    for (let key = 0; key < len; key++) {
      if (types[key]._id === typeId) {
        data = types[key];
        break;
      }
    }

    return (
      <Card 
        bordered={false}
        title="详细信息"
        foot={this.renderFoot(data)}>
        {this.renderContent(data)}
        {this.renderOptions()}
      </Card>
    );
  }
}
