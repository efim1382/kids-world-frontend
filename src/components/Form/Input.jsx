import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { Control } from 'react-redux-form';
import TextField from 'material-ui/TextField';

import styles from './style.css';

const Input = ({ model, label, type, className, ...props }) => <Control
  model={model}
  className={classNames(styles.input, className)}
  component={TextField}
  {...label ? { floatingLabelText: label } : {}}
  {...type ? { type } : {}}
  {...props}
/>;

Input.propTypes = {
  model: PropTypes.string.isRequired,
  label: PropTypes.string,
  type: PropTypes.string,
  className: PropTypes.string,
};

export default Input;
