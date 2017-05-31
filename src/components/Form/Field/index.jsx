import React, { PropTypes } from 'react';
import styles from './style.css';

const Field = ({
  type = 'text',
  placeholder,
}) => <div className={styles.fieldWrapper}>
  <input
    type={type}
    placeholder={placeholder}
    className={styles.field}
  />
</div>;

Field.propTypes = {
  type: PropTypes.string,
  placeholder: PropTypes.string,
};

export default Field;
