import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Navigation from 'components/Navigation';
import baseStyles from 'containers/Layout/style.css';
import ProfileSidebar from './Sidebar';
import styles from './style.css';

const UserProfile = ({
  children,
  navigationItems,
}) => <div
  className={classNames(baseStyles.content, styles.profile)}
>
  <ProfileSidebar />

  <div className={styles.profileWrapper}>
    {navigationItems && <Navigation className={styles.navigation} items={navigationItems} />}

    <div className={styles.profileContent}>
      { children }
    </div>
  </div>
</div>;

UserProfile.propTypes = {
  children: PropTypes.node,
  navigationItems: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    isActive: PropTypes.boold,
  })),
};

export default UserProfile;
