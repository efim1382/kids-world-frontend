import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Field, actions } from 'react-redux-form';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import theme from './theme';

class Select extends Component {
  static propTypes = {
    model: PropTypes.string.isRequired,
    label: PropTypes.string,
    defaultValue: PropTypes.string,
    formModel: PropTypes.string,
    formDispatch: PropTypes.func,

    items: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    })).isRequired,
  };

  state = {
    value: '',
  };

  componentWillMount() {
    const { defaultValue } = this.props;

    if (defaultValue) {
      this.setState({ value: defaultValue });
    }
  }

  handleChange = (event, index, value) => {
    const { model, formModel, formDispatch } = this.props;

    this.setState({ value });

    if (formDispatch) {
      formDispatch(actions.change(`${formModel}${model}`, value));
    }
  };

  render() {
    const { model, label, items } = this.props;

    return <Field model={model}>
      <SelectField
        floatingLabelText={label}
        style={theme.selectField}
        onChange={this.handleChange}
        value={this.state.value}
      >
        {items && items.map(item => <MenuItem
          key={item.value}
          value={item.value}
          primaryText={item.name}
        />)}
      </SelectField>
    </Field>;
  }
}

export default Select;
