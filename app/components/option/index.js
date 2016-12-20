import React, { Component } from 'react';
import { Table, Card, Button, Input } from 'react-eva';
import * as actions from 'actions/option';
import * as typeActions from 'actions/type';
import { isEmpty } from 'lib/lang';

export default class Option extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const { 
      params: { typeId }, 
      type: { types },
      dispatch,
    } = this.props;

    dispatch(typeActions.setCurrentTypeId(typeId));    

    if (!types) {
      dispatch(typeActions.queryTypes());
    }

    dispatch(actions.queryOptions(typeId));
  }

  componentWillUnmount() {
    this.props.dispatch(actions.cleanupOptions());
  }


  handleInputChange(pid, { target: { id, name, value } }) {
    const { dispatch } = this.props;
    dispatch(actions.updateOptionInput({
      pid, id, name, value,
    }));
  }

  handleAddOption() {
    const { 
      dispatch,
      type: { currentType: { supportedLanguages } },
    } = this.props;

    const languages = supportedLanguages;
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
      type: { currentType: { supportedLanguages } },
    } = this.props;

    const optionsToDelete = [];
    const optionsToCreate = [];

    Object.keys(editedOptions).forEach(key => {
      const { action } = editedOptions[key];

      if (action === 'delete') {
        optionsToDelete.push(key);
      } else {
        optionsToCreate.push(supportedLanguages.map((lang) => ({
          language: lang,
          description: editedOptions[key][lang].description
        })));
      }
    });

    if (optionsToCreate.length > 0) {
      dispatch(actions.submitOptions({ 
        data: optionsToCreate, 
        typeId,
      }));
    }

    if (optionsToDelete.length > 0) {
      dispatch(actions.deleteOptions({
        data: optionsToDelete,
        typeId,       
      }))
    }
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

    const {
      type: { currentType: { supportedLanguages } } 
    } = this.props;

    const languages = supportedLanguages;

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

  handleRemove(id) {
    const { dispatch } = this.props;
    dispatch(actions.removeOption(id));
  }

  renderContentList(languages, item) {
    const l = [];

    languages.forEach((language, key) => {
      if (item[language]) {
        const { _id, description } = item[language];
        l.push(
          <div className="col-3" key={key}>
            <Input
              id={_id || Date.now()}
              name={language}
              value={description || ''}
              onChange={this.handleInputChange.bind(this, item.pid || Date.now())} />
          </div>                    
        );
      }
    });

    l.push(
      <div className="col-3" key="remove">
        <Button 
          onClick={this.handleRemove.bind(this, item.id)}>
          删除
        </Button>
      </div>  
    );
    return l;
  }

  renderContent() {
    const { 
      option: {
        editedOptions, defaultOptions, queryOptionsStatus,
      },
      type: { currentType: { supportedLanguages } },
    } = this.props;

    const languages = supportedLanguages;

    if (queryOptionsStatus === 'pending') {
      return null;
    }

    const options = [];

    if (defaultOptions && defaultOptions.length > 0) {
      defaultOptions.forEach(option => {
        const { _id, content } = option;
        const obj = {};
        content.forEach(item => obj[item.language] = {...item});
        if (!editedOptions[_id.toString()]) {
          options.push({
            id: _id,
            ...obj,
          })
        }
      })
    }

    Object.keys(editedOptions).forEach(key => {
      if (editedOptions[key].action !== 'delete') {
        options.push(editedOptions[key]);
      }
    })

    return (
      options.map((item, key) => {
        return (
          <div 
            id={item.id}
            className="row" 
            key={key}>
            {this.renderContentList(languages, item)}
          </div>
        )
      })
    );
  }

  render() {
    const { 
      option: { defaultOptions },
      type: { currentType, currentTypeId },
    } = this.props;

    if (!currentType || currentTypeId !== currentType['_id']) {
      return null;
    }

    const title = currentType.name;

    return (
      <Card 
        title={title}
        extra={this.renderExtra()}
        foot={this.renderFooter()}>
        {this.renderHeader()}
        {this.renderContent()}
      </Card>
    )
  }
}  
