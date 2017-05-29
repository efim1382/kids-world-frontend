import React, { PropTypes } from 'react';
import classNames from 'classnames';
import styles from './style.css';

const Icon = ({ icon }) => <i className={classNames(styles.icon, 'material-icons')}>{ icon }</i>;

Icon.propTypes = {
  icon: PropTypes.string.isRequired,
};

export default Icon;
