import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { Control } from 'react-redux-form';
import TextField from 'material-ui/TextField';

import theme from './theme';
import styles from './style.css';

const InputComponent = ({ ...props }) => <TextField style={theme.textField} {...props} />;

const Input = ({
  model,
  label,
  type = 'text',
  className,
  defaultValue = '',
  ...props
}) => <Control
  model={model}
  className={classNames(styles.input, className)}
  component={InputComponent}
  controlProps={{ defaultValue }}
  type={type}
  {...type === 'textarea' ? { multiLine: true } : {}}
  {...label ? { floatingLabelText: label } : {}}
  {...props}
/>;

Input.propTypes = {
  model: PropTypes.string.isRequired,
  label: PropTypes.string,
  type: PropTypes.string,
  defaultValue: PropTypes.string,
  className: PropTypes.string,
};

export default Input;
