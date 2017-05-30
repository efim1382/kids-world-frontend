import React from 'react';
import classnames from 'classnames';

import Header from 'components/Header';
import Footer from 'components/Footer';

import Sidebar from './Sidebar';

import styles from './style.css';
import baseStyles from '../Layout/style.css';

const UserProfile = () => (
  <div className={baseStyles.page}>
    <Header />

    <div className={classnames(baseStyles.content, styles.userProfile)}>
      <Sidebar className={styles.sidebar} />
    </div>

    <Footer />
  </div>
);

export default UserProfile;
