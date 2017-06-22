import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './style.css';

const Icon = ({
  icon,
  className,
}) => <i className={classNames(styles.icon, className, 'material-icons')}>{ icon }</i>;

Icon.propTypes = {
  icon: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default Icon;
