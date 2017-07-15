import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Navigation } from 'components';
import baseStyles from 'containers/Layout/style.css';
import ProfileSidebar from './Sidebar';
import styles from './style.css';

const UserProfile = ({
  children,
  navigationItems,
  user,
}) => <div
  className={classNames(baseStyles.content, styles.profile)}
>
  <ProfileSidebar user={user} />

  <div className={styles.profileWrapper}>
    {navigationItems && <Navigation className={styles.navigation} items={navigationItems} />}

    <div className={styles.profileContent}>
      { children }
    </div>
  </div>
</div>;

UserProfile.propTypes = {
  children: PropTypes.node,
  user: PropTypes.shape({
    photo: PropTypes.string,
    name: PropTypes.string,
    phone: PropTypes.string,
    email: PropTypes.string,
    address: PropTypes.string,
  }),
  navigationItems: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    isActive: PropTypes.bool,
  })),
};

export default UserProfile;
