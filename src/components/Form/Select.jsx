import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from 'components/Form/style.css';

const Select = ({
  items,
  caption,
  onChange,
}) => <div className={styles.fieldWrapper}>
  {caption && <label className={styles.fieldCaption}>{ caption }</label>}

  <select
    className={classNames(styles.field, styles.select)}
    onChange={onChange}
  >
    {caption && <option>{ caption }</option>}

    {items.map(option => (
      <option
        key={option.value}
        value={option.value}
      >{ option.caption }</option>
    ))}
  </select>
</div>;

Select.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    caption: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  })).isRequired,
  caption: PropTypes.string,
  onChange: PropTypes.func,
};

export default Select;
