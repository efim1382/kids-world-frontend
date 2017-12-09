import React from 'react';
import PropTypes from 'prop-types';

import { Control } from 'react-redux-form';
import TextField from 'material-ui/TextField';

import theme from './theme';

const InputComponent = ({ ...props }) => <TextField style={theme.textField} {...props} />;

const Field = ({
  model,
  label,
  type = 'text',
  defaultValue = '',
  ...props
}) => <Control
  model={model}
  component={InputComponent}
  controlProps={{ defaultValue }}
  type={type}
  {...type === 'textarea' ? { multiLine: true } : {}}
  {...label ? { floatingLabelText: label } : {}}
  {...props}
/>;

Field.propTypes = {
  model: PropTypes.string.isRequired,
  label: PropTypes.string,
  type: PropTypes.string,
  defaultValue: PropTypes.string,
};

export default Field;
