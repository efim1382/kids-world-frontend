import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from 'components/Form/style.css';

const Field = ({
  type = 'text',
  placeholder,
  caption,
}) => <div className={styles.fieldWrapper}>
  {caption && <label className={styles.fieldCaption}>{ caption }</label>}

  {type !== 'textarea' && <input
    type={type}
    placeholder={placeholder}
    className={styles.field}
  />}

  {type === 'textarea' && <textarea
    placeholder={placeholder}
    className={classNames(styles.field, styles.textarea)}
  />}
</div>;

Field.propTypes = {
  type: PropTypes.string,
  placeholder: PropTypes.string,
  caption: PropTypes.string,
};

export default Field;
