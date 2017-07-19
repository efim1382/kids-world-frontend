import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Control } from 'react-redux-form';
import styles from 'components/Form/style.css';

const Select = ({
  items,
  caption,
  placeholder,
  model,
  defaultValue,
}) => <div className={styles.fieldWrapper}>
  {caption && <label className={styles.fieldCaption}>{ caption }</label>}

  <Control.select
    model={model}
    className={classNames(styles.field, styles.select)}
    controlProps={{
      defaultValue,
    }}
  >
    {placeholder && <option>{ placeholder }</option>}

    {items && items.map(option => (
      <option
        key={option.value}
        value={option.value}
      >{ option.caption }</option>
    ))}
  </Control.select>
</div>;

Select.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    caption: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  })).isRequired,
  caption: PropTypes.string,
  model: PropTypes.string,
  defaultValue: PropTypes.string,
  placeholder: PropTypes.string,
};

export default Select;
