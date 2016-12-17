import React, { Component } from 'react';
import { Table, Card, Button, Input } from 'react-eva';
import * as actions from 'actions/option';
import { isEmpty } from 'lib/lang';

export default class Option extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const { 
      params: { typeId},
      dispatch,
    } = this.props;

    dispatch(actions.queryOptions(typeId));
  }

  handleInputChange(pid, { target: { id, name, value } }) {
    const { dispatch } = this.props;
    dispatch(actions.updateOptionInput({
      pid, id, name, value,
    }));
  }

  handleAddOption() {
    const { dispatch } = this.props;

    const languages = ['en', 'ja', 'ch'];
    const init = {};
    languages.forEach(lang => {
      init[lang] = {};
    });
    
    dispatch(actions.addNewOptions({
      pid: Date.now(),
      action: 'add',
      ...init,
    }));
  }

  handleSubmit() {
    const { 
      dispatch, 
      option: { editedOptions },
      params: { typeId },
    } = this.props;

    const data = Object.keys(editedOptions).map(key => {
      const { en, ja, ch } = editedOptions[key];
      return [{
        language: 'en',
        description: en,
      }, {
        language: 'ch',
        description: ch,
      }, {
        language: 'ja',
        description: ja,
      }];
    });

    dispatch(actions.submitOptions({ 
      data, typeId,
    }));
  }

  renderExtra() {
    return (
      <Button
        onClick={::this.handleAddOption} 
        type="primary">
        添加选项
      </Button>
    );
  }

  renderFooter() {
    return (
      <Button
        onClick={::this.handleSubmit}
        type="primary">
        提交
      </Button>
    );
  }

  renderHeader() {
    const languages = ['en', 'ja', 'ch'];

    return (
      <div className="row" key="header">
        {
          languages.map((language, key) =>
            <div className="col-4" key={key}>
              <label>
                {language}
              </label>
            </div>              
          )
        }
      </div>
    );
  }

  renderContent() {
    const { 
      option: {
        editedOptions, defaultOptions, queryOptionsStatus,
      }
    } = this.props;

    const languages = ['en', 'ja', 'ch'];

    if (queryOptionsStatus === 'pending') {
      return null;
    }

    const options = [];

    if (defaultOptions && defaultOptions.length > 0) {
      defaultOptions.forEach(option => {
        const { _id, content } = option;
        const obj = {};
        content.forEach(item => obj[item.language] = {...item});

        options.push({
          id: _id,
          ...obj,
        })
      })
    }

    Object.keys(editedOptions).forEach(key => {
      options.push(editedOptions[key]);
    })

    return (
      options.map((item, key) => {
        return (
          <div className="row" key={key}>
            {
              languages.map((language, key) => {
                if (item[language]) {
                  const { _id, description } = item[language];
                  return (
                    <div className="col-4" key={key}>
                      <Input
                        id={_id || Date.now()}
                        name={language}
                        value={description || ''}
                        onChange={this.handleInputChange.bind(this, item.pid || Date.now())} />
                    </div>                    
                  );
                }
                return null;
              })
            }
          </div>
        )
      })
    );
  }

  render() {
    return (
      <Card 
        title="请输入默认值" 
        extra={this.renderExtra()}
        foot={this.renderFooter()}>
        {this.renderHeader()}
        {this.renderContent()}
      </Card>
    )
  }
}  