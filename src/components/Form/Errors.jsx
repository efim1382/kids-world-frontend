import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './style.css';

const Errors = ({ message, show }) => {
  const className = show ? styles.errors : classNames(styles.errors, styles.showErrors);

  return <div className={className}>
    <span>{ message }</span>
  </div>;
};

Errors.propTypes = {
  message: PropTypes.string.isRequired,
  show: PropTypes.bool.isRequired,
};

export default Errors;
