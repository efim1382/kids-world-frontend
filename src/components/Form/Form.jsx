import React from 'react';
import PropTypes from 'prop-types';
import { LocalForm } from 'react-redux-form';

import styles from './style.css';

const Form = ({
  children,
  ...props
}) => <LocalForm className={styles.form} {...props} >
  { children }
</LocalForm>;

Form.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Form;
