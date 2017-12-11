import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './style.css';

const Icon = ({
  name,
  className,
}) => <i className={classNames('material-icons', styles.icon, className)}>{ name }</i>;

Icon.propTypes = {
  name: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default Icon;
