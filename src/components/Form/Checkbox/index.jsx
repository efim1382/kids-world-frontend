import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import Icon from 'components/Icon';
import styles from 'components/Form/style.css';

class Checkbox extends Component {
  static propTypes = {
    children: PropTypes.node,
    onChange: PropTypes.func,
    checked: PropTypes.bool,
  };

  state = {
    checked: this.props.checked,
  };

  check = () => {
    this.setState({
      checked: !this.state.checked,
    });

    this.props.onChange(this.state.checked);
  }

  render() {
    const { children } = this.props;

    return (
      <div className={classNames(styles.fieldWrapper, styles.checkboxWrapper)}>
        <input
          type="checkbox"
          className={styles.checkboxInput}
          value={this.state.checked}
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

        {children && <label className={styles.caption}>{ children }</label>}
      </div>
    );
  }
}

export default Checkbox;
