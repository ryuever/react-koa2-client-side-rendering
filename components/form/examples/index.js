import React, { Component } from 'react';
import { render } from 'react-dom';

import 'wall-e';

import Form from '../index';
import FormField from '../FormField';
import { Select, Button, Checkbox, Radio, Switch, Input } from 'react-eva';

const colors = ['Red', 'Orange', 'Yellow', 'Green', 'Blue', 'Indigo', 'Violet'];
const fruits = [
  { label: 'apple', value: 'Apple' },
  { label: 'pear', value: 'Pear', disabled: true },
  { label: 'orange', value: 'Orange' },
];

const fields = {
  username: { defaultValue: 'jiriayame' },
  age: { defaultValue: 27 },
  gender: { defaultValue: 'Male' },
  agree: { defaultValue: true },
  fruits: { defaultValue: ['Orange'] },
  avatar: null,
  email: null,
  favoriteColor: { defaultValue: 'Blue' },
  // enable this to test multiple select
  // favoriteColor: { defaultValue: ['Blue'] },
};

class ValidationForm extends Component {

  handleSubmit() {
    console.log(this.props.formData);
  }

  handleGenderChange(event) {
    console.log('gender: ', event.target.value);
  }

  handleFruitsChange(selectedFruits) {
    console.log('fruits: ', selectedFruits);
  }

  render() {
    const { fields } = this.props;

    return (
      <div className="row flex-items-center" style={{ width: 500, height: '100vh', margin: 'auto' }}>
        <Form className="col-12"
          onSubmit={::this.handleSubmit}>
          <FormField labelCol={3} fieldCol={9} label="Username">
            <Input {...fields.username} />
          </FormField>

          <FormField labelCol={3} fieldCol={9} label="Age">
            <Input type="number" {...fields.age} />
          </FormField>

          <FormField labelCol={3} fieldCol={9} label="Gender">
            <Radio.Group {...fields.gender}
              onChange={::this.handleGenderChange}>
              <Radio value="Male">male</Radio>
              <Radio value="Female">female</Radio>
            </Radio.Group>
          </FormField>

          <FormField labelCol={3} fieldCol={9} label="Agree">
            <Switch size="sm" {...fields.agree} />
          </FormField>

          <FormField labelCol={3} fieldCol={9} label="Fruits">
            <Checkbox.Group {...fields.fruits}
              options={fruits}
              onChange={::this.handleFruitsChange} />
          </FormField>

          <FormField labelCol={3} fieldCol={9} label="Avatar">
            <Input.File value="选择图片" {...fields.avatar} />
          </FormField>

          <FormField labelCol={3} fieldCol={9} label="Email">
            <Input type="email" {...fields.email} />
          </FormField>

          <FormField labelCol={3} fieldCol={9} label="Favorite Color">
            <Select.Native options={colors} {...fields.favoriteColor} />
          </FormField>

          <FormField className="row">
            <div className="col-3" />
            <div className="col-3">
              <Button type="primary">submit</Button>
            </div>
          </FormField>
        </Form>
      </div>
    );
  }
}

const App = Form.create({
  fields,
})(ValidationForm);

render(
  <App />,
  document.querySelector('#app')
);
