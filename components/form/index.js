import React, { Component } from 'react';
import hoistStatics from 'hoist-non-react-statics';
import { isEmpty } from 'lib/lang';
import getValue from './utils/getValue';
import Form from './Form';

const trigger = 'onChange';

Form.create = (options = {}) => WrappedComponent => {
  const { fields } = options;
  const defaultProps = WrappedComponent.defaultProps || {};
  const defaultFields = defaultProps.fields || {};
  class ConnectForm extends Component {
    constructor(props) {
      super(props);

      this.cachedBinds = {};
      this.fields = { ...defaultFields, ...fields };
      this.state = {
        formData: {},
      };
    }

    componentWillMount() {
      const { formData } = this.state;
      if (!isEmpty(this.fields)) {
        Object.keys(this.fields).forEach(name => {
          const fieldProps = this.fields[name] || {};
          fieldProps.id = `react-eva-uid-form-${name}`;
          fieldProps['data-meta-field'] = true;
          fieldProps[trigger] = this.getCacheBind(name, trigger, this.handleChange);
          if (fieldProps.defaultValue) {
            formData[name] = fieldProps.defaultValue;
          }
        });
      }

      this.setState({ formData });
    }

    getCacheBind(name, trigger, fn) {
      const cache = this.cachedBinds[name] || {};

      if (!cache[trigger]) {
        cache[trigger] = fn.bind(this, name, trigger);
      }

      return cache[trigger];
    }

    handleChange(name, trigger, event) {
      const fieldValue = getValue(event);
      const { formData } = this.state;

      if (fieldValue !== '') {
        formData[name] = fieldValue;
      } else {
        delete formData[name];
      }

      this.setState({ formData });
    }

    render() {
      const { formData } = this.state;
      const props = { ...this.props, formData, fields: { ...this.fields } };
      return <WrappedComponent {...props} />;
    }
  }

  return hoistStatics(ConnectForm, WrappedComponent);
};

export default Form;
