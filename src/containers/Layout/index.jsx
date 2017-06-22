import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

const Layout = ({ children }) => (
  <div>{ children }</div>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
export styles from './style.css';
