import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';

import {
  Header,
  UserProfile,
  Navigation,
} from 'components';

import { api as userApi } from 'containers/User';
import styles from './style.css';
import baseStyles from '../Layout/style.css';

export routes from './routes';

const Profile = ({ children, user }) => <div className={baseStyles.page}>
  <Header />

  <div className={classNames(baseStyles.content, styles.profile)}>
    {!_.isEmpty(user) && <UserProfile
      name={`${user.firstName} ${user.lastName}`}
      phone={`${user.phone}`}
      email={`${user.email}`}
      address={`${user.address}`}
      photo={`${user.photo}`}
      className={styles.content}
    >
      <Navigation
        items={[
          {
            name: 'Объявления',
            link: '/profile/adverts',
          },

          {
            name: 'Избранное',
            link: '/profile/favorites',
          },

          {
            name: 'Настройки',
            link: '/profile/settings',
          },
        ]}
      />

      { children }
    </UserProfile>}
  </div>
</div>;

Profile.propTypes = {
  user: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    phone: PropTypes.string,
    email: PropTypes.string,
    address: PropTypes.string,
    photo: PropTypes.string,
  }),

  children: PropTypes.node,
};

export default compose(
  connect(
    state => ({
      user: _.get(state, 'users.currentUser.data', {}),
    }),

    {
      currentUser: userApi.actions.currentUser.sync,
    },
  ),

  lifecycle({
    componentWillMount() {
      const token = localStorage.getItem('token');

      this.props.currentUser({}, {
        body: JSON.stringify({ token }),
      });
    },
  }),
)(Profile);
