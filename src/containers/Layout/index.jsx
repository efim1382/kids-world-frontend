import React, { PropTypes } from 'react';
import styles from './style.css';

const Layout = ({ children }) => (
  <div className={styles.page}>{ children }</div>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
