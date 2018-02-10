import React, { Component } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { Portal } from 'react-portal';
import { hideNotification } from './actions';
import styles from './style.css';

export reducers from './reducers';

class Notification extends Component {
  static propTypes = {
    message: PropTypes.string,
    show: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired,
  };

  componentWillReceiveProps(nextProps) {
    const { dispatch } = this.props;
    const { show } = nextProps;

    if (!show) {
      return;
    }

    setTimeout(() => {
      dispatch(hideNotification());
    }, 3000);
  }

  render() {
    const { show, message } = this.props;

    return <Portal>
      <div className={classNames(styles.notification, { '_is-shown': show })}>{ message }</div>
    </Portal>;
  }
}

export default connect(state => ({
  show: _.get(state, 'notification.isShown', false),
  message: _.get(state, 'notification.message', ''),
}))(Notification);
