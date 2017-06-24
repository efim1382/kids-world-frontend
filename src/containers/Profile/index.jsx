import React from 'react';
import Header from 'components/Header';
import Footer from 'components/Footer';
import UserProfile from 'components/UserProfile';
import AdvertList from 'components/AdvertList';
import baseStyles from 'containers/Layout/style.css';

const Profile = () => {
  const navItems = [{
    name: 'Мои объявления',
    link: '/profile',
    isActive: true,
  }, {
    name: 'Настройки',
    link: '/profile/settings',
  }];

  const adverts = [{
    id: '1',
    image: '/images/ad-image.jpg',
    title: 'Детские тапки, красные',
    link: '/profile/advert/edit/1',
  }, {
    id: '2',
    image: '/images/ad-image.jpg',
    title: 'Детские тапки, красные',
    link: '/profile/advert/edit/2',
  }, {
    id: '3',
    image: '/images/ad-image.jpg',
    title: 'Детские тапки, красные',
    link: '/profile/advert/edit/3',
  }];

  return (
    <div className={baseStyles.page}>
      <Header />

      <UserProfile navigationItems={navItems}>
        <AdvertList items={adverts} caption="Редактировать" />
      </UserProfile>

      <Footer />
    </div>
  );
};

export default Profile;
