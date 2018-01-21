import React from 'react';
import { Notification } from 'components';
import PropTypes from 'prop-types';
import './style.css';

export styles from './style.css';

const Layout = ({ children }) => (
  <div>
    { children }

    <Notification />
  </div>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
