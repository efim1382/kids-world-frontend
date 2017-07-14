import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Control } from 'react-redux-form';
import { Cond, Clause, Default } from 'react-cond';
import styles from 'components/Form/style.css';

const Field = ({
  type = 'text',
  placeholder,
  caption,
  model,
  value,
}) => <div className={styles.fieldWrapper}>
  {caption && <label className={styles.fieldCaption}>{ caption }</label>}

  <Cond value={type}>
    <Clause test={'textarea'}>
      <Control.textarea
        model={model}
        className={classNames(styles.field, styles.textarea)}
        placeholder={placeholder}
      />
    </Clause>

    <Default>
      <Control
        type={type}
        model={model}
        className={styles.field}
        placeholder={placeholder}
        value={value}
      />
    </Default>
  </Cond>
</div>;

Field.propTypes = {
  type: PropTypes.string,
  placeholder: PropTypes.string,
  caption: PropTypes.string,
  model: PropTypes.string,
  value: PropTypes.string,
};

export default Field;
