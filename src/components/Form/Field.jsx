import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Control } from 'react-redux-form';
import styles from 'components/Form/style.css';

const Field = ({
  type = 'text',
  placeholder,
  caption,
  model,
  value,
  className,
}) => <div className={classNames(styles.fieldWrapper, className)}>
  {caption && <label className={styles.fieldCaption}>{ caption }</label>}

  <Control
    type={type}
    model={model}
    className={styles.field}
    placeholder={placeholder}
    value={value}
  />
</div>;

Field.propTypes = {
  type: PropTypes.string,
  placeholder: PropTypes.string,
  caption: PropTypes.string,
  model: PropTypes.string,
  value: PropTypes.string,
  className: PropTypes.string,
};

export default Field;
