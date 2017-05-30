import React from 'react';
import classnames from 'classnames';

import Header from 'components/Header';
import Footer from 'components/Footer';
import Navigation from 'components/Navigation';

import Sidebar from './Sidebar';
import AdvertList from './AdvertList';

import styles from './style.css';
import baseStyles from '../Layout/style.css';

const UserProfile = () => {
  const navItems = [{
    name: 'Объявления',
    link: '/user/1',
    isActive: true,
  }, {
    name: 'Отзывы',
    link: '/user/1/reviews',
  }];

  return (
    <div className={baseStyles.page}>
      <Header />

      <div className={classnames(baseStyles.content, styles.userProfile)}>
        <Sidebar className={styles.sidebar} />

        <div className={styles.profileWrapper}>
          <Navigation items={navItems} />
          <AdvertList className={styles.profileContent} />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default UserProfile;
