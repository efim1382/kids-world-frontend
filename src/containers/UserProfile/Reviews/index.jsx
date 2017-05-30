import React from 'react';
import classNames from 'classnames';

import Header from 'components/Header';
import Footer from 'components/Footer';
import Navigation from 'components/Navigation';

import baseStyles from 'containers/Layout/style.css';

import Sidebar from '../Sidebar';
import ReviewsList from './ReviewsList';

import pageStyles from '../style.css';

const UserProfileReviews = () => {
  const navItems = [{
    name: 'Объявления',
    link: '/user/1',
  }, {
    name: 'Отзывы',
    link: '/user/1/reviews',
    isActive: true,
  }];

  return (
    <div className={baseStyles.page}>
      <Header />

      <div className={classNames(baseStyles.content, pageStyles.userProfile)}>
        <Sidebar className={pageStyles.sidebar} />

        <div className={pageStyles.profileWrapper}>
          <Navigation items={navItems} />
          <ReviewsList className={pageStyles.profileContent} />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default UserProfileReviews;
