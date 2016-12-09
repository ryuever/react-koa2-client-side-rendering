import React, { Component } from 'react';
import { FormField, Input, Radio } from 'react-eva';
import * as actions from '../../actions/questionnaire';

export default class Profile extends Component {
  constructor(props) {
    super(props);
  }

  handleUpdate({ target: { id, value} }) {
    const { dispatch } = this.props;
    dispatch(actions.updateInput({
      [id]: value,
    }));
  }

  render() {
    return (
      <div className="user-profile">
        <FormField>
          <label>
            name
            <Input
              id="name"
              onChange={::this.handleUpdate} 
              placeholder="please enter your name"/>
          </label>
        </FormField>

        <FormField>
          <label>
            gender
            <Radio.Group>
              <Radio value="male">男</Radio>
              <Radio value="female">女</Radio>              
            </Radio.Group>
          </label>
        </FormField>

        <FormField>
          <label>
            age
            <Radio.Group>
              <Radio value="1020">10 ~ 20</Radio>
              <Radio value="2040">20 ~ 40</Radio>   
              <Radio value="4060">40 ~ 60</Radio>
              <Radio value="6080">60 ~ 80</Radio> 
              <Radio value="80">80 ~ </Radio>
            </Radio.Group>
          </label>
        </FormField>

        <FormField>
          <label>
            disabled
            <Radio.Group>
              <Radio value="null">null</Radio>
              <Radio value="footer">footer</Radio>   
              <Radio value="hand">hand</Radio>
            </Radio.Group>
          </label>
        </FormField>

        <FormField>
          <label>
            nationality
            <Radio.Group>
              <Radio value="china">China</Radio>
              <Radio value="japanese">Japan</Radio>   
              <Radio value="tailand">Tailand</Radio>
            </Radio.Group>
          </label>
        </FormField>
      </div>
    )
  }
}