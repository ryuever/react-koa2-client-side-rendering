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

  handleInputChange({ target: { id, name, value } }) {
    const { dispatch } = this.props;
    dispatch(actions.updateOptionInput({
      id, value, name,
    }));
  }

  handleAddOption() {
    const { dispatch } = this.props;

    const languages = ['en', 'ja', 'ch'];
    const init = {};
    languages.forEach(lang => {
      init[lang] = '';
    });
    
    dispatch(actions.addNewOptions({
      id: Date.now(),
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

    console.log('typeId : ', typeId);

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
        editedOptions, defaultOptions,
      }
    } = this.props;

    const languages = ['en', 'ja', 'ch'];

    if (isEmpty(editedOptions)) {
      return null;
    }

    if (defaultOptions && defaultOptions.length > 0) {
      defaultOptions.forEach(option => {
        const { _id, content } = option;
        options.push({
          id: _id,
          ...content,
        })
      })
    }

    const options = [];
    Object.keys(editedOptions).forEach(key => {
      options.push(editedOptions[key]);
    })

    return (
      options.map((item, key) =>
        <div className="row" key={key}>
          {
            languages.map((language, key) =>
              <div className="col-4" key={key}>
                <Input
                  id={item.id}
                  name={language}
                  onChange={::this.handleInputChange} />
              </div>              
            )
          }
        </div>
      )
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


// 只能够添加和删除，不能够更改
// {
//   type: xxx,
//   content: {

//   }
// }

// action: 'add',
// pid: {
//   content: {
//     id: {
//       language: 'en',
//       description: 'xxxx',
//     }
//   }
// }

// =>

// {
//   type: pid,
//   content: [{
//     language: 'en',
//     description: 'xxx',
//   }, {
//     language: 'ja',
//     description: 'xxxx',
//   }],
// }