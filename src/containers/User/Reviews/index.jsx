import React from 'react';
import Header from 'components/Header';
import Footer from 'components/Footer';
import UserProfile from 'components/UserProfile';
import baseStyles from 'containers/Layout/style.css';
import ReviewsList from './ReviewsList';

const UserReviews = () => {
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

      <UserProfile navigationItems={navItems}>
        <ReviewsList />
      </UserProfile>

      <Footer />
    </div>
  );
};

export default UserReviews;
