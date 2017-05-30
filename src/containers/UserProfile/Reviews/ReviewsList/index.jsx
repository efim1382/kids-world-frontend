import React, { PropTypes } from 'react';
import classNames from 'classnames';

import styles from './style.css';

const ReviewsList = ({
  className,
}) => <div className={classNames(styles.reviewsList, className)} />;

ReviewsList.propTypes = {
  className: PropTypes.string,
};

export default ReviewsList;
