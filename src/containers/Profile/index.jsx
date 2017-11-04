import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import {
  Header,
  Footer,
  UserProfile,
} from 'components';

import styles from './style.css';
import baseStyles from '../Layout/style.css';

export routes from './routes';

const Profile = ({ children }) => <div className={baseStyles.page}>
  <Header />

  <div className={classNames(baseStyles.content, styles.profile)}>
    <UserProfile>
      { children }
    </UserProfile>
  </div>

  <Footer />
</div>;

Profile.propTypes = {
  children: PropTypes.node,
};

export default Profile;
