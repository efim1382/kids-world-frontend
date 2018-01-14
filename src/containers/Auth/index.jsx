import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Header } from 'components';
import styles from './style.css';
import baseStyles from '../Layout/style.css';

export routes from './routes';
export api from './api';

const Auth = ({ children }) => <div className={baseStyles.page}>
  <Header />

  <div className={classNames(baseStyles.content, styles.auth)}>
    <div className={styles.formWrapper}>
      { children }
    </div>
  </div>
</div>;

Auth.propTypes = {
  children: PropTypes.node,
};

export default Auth;
