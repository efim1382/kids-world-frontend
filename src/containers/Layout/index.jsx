import React from 'react';
import _ from 'lodash';
import { Notification } from 'components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './style.css';

export styles from './style.css';

const Layout = ({ children, isNotificationShown }) => (
  <div>
    { children }

    {isNotificationShown && <Notification />}
  </div>
);

Layout.propTypes = {
  isNotificationShown: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
};

export default connect(state => ({
  isNotificationShown: _.get(state, 'notification.isShown', false),
}))(Layout);
