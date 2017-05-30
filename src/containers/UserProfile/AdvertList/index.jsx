import React, { PropTypes } from 'react';
import classNames from 'classnames';

import styles from './style.css';

const AdvertList = ({
  className,
}) => <div className={classNames(styles.advertList, className)} />;

AdvertList.propTypes = {
  className: PropTypes.string,
};

export default AdvertList;
