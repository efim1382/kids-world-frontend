import React, { Component } from 'react';
import _ from 'lodash';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { hideNotification } from './actions';
import styles from './style.css';

export reducers from './reducers';

class Notification extends Component {
  static propTypes = {
    message: PropTypes.string,
    dispatch: PropTypes.func.isRequired,
  };

  state = {
    className: styles.notification,
  };

  componentDidMount() {
    this.showNotification();

    setTimeout(() => {
      this.setState({
        className: styles.notification,
      });

      this.hideNotification();
    }, 3000);
  }

  showNotification = () => {
    setTimeout(() => {
      this.setState({
        className: classNames(styles.notification, styles.isShown),
      });
    }, 0);
  };

  hideNotification = () => {
    const { dispatch } = this.props;

    setTimeout(() => {
      dispatch(hideNotification());
    }, 200);
  };

  render() {
    const { message } = this.props;
    return <div className={this.state.className}>{ message }</div>;
  }
}

export default connect(state => ({
  message: _.get(state, 'notification.message', ''),
}))(Notification);
