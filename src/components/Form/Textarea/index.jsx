import React, { PropTypes } from 'react';
import styles from 'components/Form/style.css';

const Textarea = ({
  type = 'text',
  placeholder,
}) => <div className={styles.fieldWrapper}>
  <input
    type={type}
    placeholder={placeholder}
    className={styles.field}
  />
</div>;

Textarea.propTypes = {
  type: PropTypes.string,
  placeholder: PropTypes.string,
};

export default Textarea;
