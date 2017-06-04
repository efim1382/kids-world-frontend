import React, { PropTypes } from 'react';
import classNames from 'classnames';
import Header from 'components/Header';
import Footer from 'components/Footer';
import baseStyles from 'containers/Layout/style.css';
import styles from './style.css';

const Auth = ({
  children,
}) => <div className={baseStyles.page}>
  <Header />

  <div className={classNames(baseStyles.content, styles.auth)}>
    <div className={styles.formWrapper}>{ children }</div>
  </div>

  <Footer />
</div>;

Auth.propTypes = {
  children: PropTypes.node,
};

export default Auth;
