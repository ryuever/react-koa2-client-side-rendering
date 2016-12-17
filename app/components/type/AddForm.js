import React, { Component } from 'react';
import { FormField, Radio, Input, Form, Tabs } from 'react-eva';
import * as actions from 'actions/type';
console.log('tabs : ', Tabs);
export default class AddForm extends Component {
  constructor(props) {
    super(props);
  }

  handleInputChange({ target: { id, value } }) {
    this.props.dispatch(actions.updateTypeInput({
      [id]: value,
    }));
  }

  renderForm() {
    return (
      <div className="form create-type">
        <Form className="col-12">
          <FormField label="Name">
            <Input
              id="name" 
              onChange={::this.handleInputChange} />
          </FormField>
          <FormField label="Description">
            <Input
              id="description" 
              onChange={::this.handleInputChange} />
          </FormField>
          <FormField label="Language">
            <Input
              id="language" 
              onChange={::this.handleInputChange} />
          </FormField>                    
        </Form>        
      </div>      
    );
  }

  render() {
    const tabs = [{
      title: '英语',
      component: this.renderForm(),
    }, {
      title: '中文',
      component: this.renderForm(),
    }, {
      title: '日语',
      component: this.renderForm(),
    }];

    const style = {
      tabTitle: {
        width: '200px',
      },
    }; 
   
    return (
      <Tabs style={style}>
        {
          tabs.map((tab, key) => {
            return (
              <Tabs.Item key={key}>
                <Tabs.Title>
                  {tab.title}
                </Tabs.Title>
                <Tabs.Panel>
                  {tab.component}
                </Tabs.Panel>
              </Tabs.Item>
            );
          })
        }
      </Tabs>
    )
  }
}