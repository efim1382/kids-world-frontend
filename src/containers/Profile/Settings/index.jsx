import React from 'react';
import Header from 'components/Header';
import Footer from 'components/Footer';
import UserProfile from 'components/UserProfile';
import baseStyles from 'containers/Layout/style.css';

const ProfileSettings = () => {
  const navItems = [{
    name: 'Мои объявления',
    link: '/profile',
  }, {
    name: 'Настройки',
    link: '/profile/settings',
    isActive: true,
  }];

  return (
    <div className={baseStyles.page}>
      <Header />

      <UserProfile navigationItems={navItems} />

      <Footer />
    </div>
  );
};

export default ProfileSettings;
