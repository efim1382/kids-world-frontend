import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Control } from 'react-redux-form';
import styles from 'components/Form/style.css';

const Textarea = ({
  placeholder,
  caption,
  defaultValue,
  model,
}) => <div className={styles.fieldWrapper}>
  {caption && <label className={styles.fieldCaption}>{ caption }</label>}

  <Control.textarea
    model={model}
    className={classNames(styles.field, styles.textarea)}
    placeholder={placeholder}
    controlProps={{
      defaultValue,
    }}
  />
</div>;

Textarea.propTypes = {
  placeholder: PropTypes.string,
  defaultValue: PropTypes.string,
  caption: PropTypes.string,
  model: PropTypes.string,
};

export default Textarea;
