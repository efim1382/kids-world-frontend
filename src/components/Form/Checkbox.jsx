import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Control } from 'react-redux-form';
import Icon from 'components/Icon';
import styles from 'components/Form/style.css';

class Checkbox extends Component {
  static propTypes = {
    children: PropTypes.node,
    onChange: PropTypes.func,
    checked: PropTypes.bool,
    model: PropTypes.string,
  };

  state = {
    checked: this.props.checked,
  };

  check = () => {
    this.setState({
      checked: !this.state.checked,
    });

    const { onChange } = this.props;
    
    if (onChange) {
      onChange(this.state.checked);
    }
  }

  render() {
    const { model, children } = this.props;

    return (
      <div className={classNames(styles.fieldWrapper, styles.checkboxWrapper)}>
        <Control.checkbox
          model={model}
          className={styles.checkboxInput}
        />

        <div
          className={styles.checkbox}
          onClick={this.check}
          {...this.state.checked ? { 'data-checked': '' } : {}}
        >
          <Icon
            icon="check"
            className={styles.checkboxIcon}
          />
        </div>

        {children && <label className={styles.checkboxCaption}>{ children }</label>}
      </div>
    );
  }
}

export default Checkbox;
