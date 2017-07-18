import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import {
  Header,
  Footer,
} from 'components';

import baseStyles from 'containers/Layout/style.css';
import styles from './style.css';

export api from './api';
export reducers from './reducers';
export routes from './routes';

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
