import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Control } from 'react-redux-form';
import UUID from 'node-uuid';

import { Icon } from 'components';

import styles from 'components/Form/style.css';

class Field extends Component {
  componentWillMount() {
    this.inputId = UUID.v4();
  }

  render() {
    const { caption, icon, model, className } = this.props;

    return <div className={classNames(styles.fieldWrapper, styles.fieldWrapperRadio, className)}>
      {caption && <label htmlFor={this.inputId} className={styles.fieldCaption}>{ caption }</label>}

      <Control
        id={this.inputId}
        type="radio"
        model={model}
        className={styles.radioField}
      />

      {icon && <label htmlFor={this.inputId} className={styles.iconLabel}>
        <Icon icon={icon} />
      </label>}
    </div>;
  }
}

Field.propTypes = {
  caption: PropTypes.string,
  model: PropTypes.string,
  icon: PropTypes.string,
  className: PropTypes.string,
};

export default Field;
