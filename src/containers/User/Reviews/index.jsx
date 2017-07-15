import React from 'react';
import PropTypes from 'prop-types';

import {
  Header,
  Footer,
} from 'components';
import UserProfile from 'components/UserProfile';

import baseStyles from 'containers/Layout/style.css';

import ReviewsList from './ReviewsList';

const UserReviews = ({ params }) => {
  const id = params.id;

  const navItems = [{
    name: 'Объявления',
    link: `/user/${id}`,
  }, {
    name: 'Отзывы',
    link: `/user/${id}/reviews`,
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

UserReviews.propTypes = {
  params: PropTypes.objectOf(PropTypes.string),
};

export default UserReviews;
