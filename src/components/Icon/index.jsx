import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './style.css';

const Icon = ({
  name, className,
}) => <i className={classNames(styles.icon, className)} data-icon={name} />;

Icon.propTypes = {
  name: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default Icon;
