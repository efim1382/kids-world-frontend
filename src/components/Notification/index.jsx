import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './style.css';

class Notification extends Component {
  static propTypes = {
    show: PropTypes.bool,
    message: PropTypes.string,
    onRequestClose: PropTypes.func,
  };

  componentWillReceiveProps(nextProps) {
    const { show } = nextProps;
    const { onRequestClose } = this.props;

    if (show) {
      setTimeout(() => {
        onRequestClose();
      }, 4000);
    }
  }

  render() {
    const { show, message } = this.props;

    return <div
      className={styles.notification}
      {...show ? { 'data-show': '' } : {}}
    >{ message }</div>;
  }
}

export default Notification;
