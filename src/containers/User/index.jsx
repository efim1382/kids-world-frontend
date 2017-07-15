import React from 'react';
import PropTypes from 'prop-types';

import {
  Header,
  Footer,
} from 'components';
import UserProfile from 'components/UserProfile';
import AdvertList from 'components/AdvertList';

import baseStyles from 'containers/Layout/style.css';

const User = ({ params }) => {
  const id = params.id;

  const navItems = [{
    name: 'Объявления',
    link: `/user/${id}`,
    isActive: true,
  }, {
    name: 'Отзывы',
    link: `/user/${id}/reviews`,
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

User.propTypes = {
  params: PropTypes.objectOf(PropTypes.string),
};

export default User;
