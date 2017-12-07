import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import {
  Header,
  Footer,
  UserProfile,
  Navigation,
} from 'components';

import styles from './style.css';
import baseStyles from '../Layout/style.css';

export routes from './routes';

const Profile = ({ children }) => <div className={baseStyles.page}>
  <Header />

  <div className={classNames(baseStyles.content, styles.profile)}>
    <UserProfile className={styles.content}>
      <Navigation
        items={[
          {
            name: 'Объявления',
            link: '/profile/adverts',
          },

          {
            name: 'Настройки',
            link: '/profile/settings',
          },
        ]}
      />

      { children }
    </UserProfile>
  </div>

  <Footer />
</div>;

Profile.propTypes = {
  children: PropTypes.node,
};

export default Profile;
