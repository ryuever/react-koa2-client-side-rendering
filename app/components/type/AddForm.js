import React, { Component } from 'react';
import { FormField, Radio, Input, Form } from 'react-eva';
import * as actions from 'actions/type';

export default class AddForm extends Component {
  constructor(props) {
    super(props);
  }

  handleInputChange({ target: { id, value } }) {
    this.props.dispatch(actions.updateTypeInput({
      [id]: value,
    }));
  }

  render() {
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
    )
  }
}