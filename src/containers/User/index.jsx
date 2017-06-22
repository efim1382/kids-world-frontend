import React from 'react';
import Header from 'components/Header';
import Footer from 'components/Footer';
import UserProfile from 'components/UserProfile';
import AdvertList from 'components/AdvertList';
import baseStyles from 'containers/Layout/style.css';

const User = () => {
  const navItems = [{
    name: 'Объявления',
    link: '/user/1',
    isActive: true,
  }, {
    name: 'Отзывы',
    link: '/user/1/reviews',
  }];

  const adverts = [{
    id: '1',
    image: '/images/ad-image.jpg',
    title: 'Детские тапки, красные',
    link: '/advert/1',
  }, {
    id: '2',
    image: '/images/ad-image.jpg',
    title: 'Детские тапки, красные',
    link: '/advert/2',
  }, {
    id: '3',
    image: '/images/ad-image.jpg',
    title: 'Детские тапки, красные',
    link: '/advert/3',
  }];

  return (
    <div className={baseStyles.page}>
      <Header />

      <UserProfile navigationItems={navItems}>
        <AdvertList items={adverts} caption="Подробнее" />
      </UserProfile>

      <Footer />
    </div>
  );
};

export default User;