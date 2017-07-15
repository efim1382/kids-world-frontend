import React from 'react';
import PropTypes from 'prop-types';
import styles from './style.css';

const ProfileSidebar = ({ user }) => (<div className={styles.profileSidebar}>
  <header className={styles.header}>
    <div
      className={styles.image}
      style={{ backgroundImage: `url(${user.photo})` }}
    />

    <p className={styles.name}>{ user.name }</p>
  </header>

  <h3 className={styles.title}>Контакты</h3>

  <div className={styles.properties}>
    <div className={styles.property}>
      <label className={styles.label}>Телефон:</label>
      <label className={styles.value}>{ user.phone }</label>
    </div>

    <div className={styles.property}>
      <label className={styles.label}>Почта:</label>
      <label className={styles.value}>{ user.email }</label>
    </div>

    <div className={styles.property}>
      <label className={styles.label}>Адрес:</label>
      <label className={styles.value}>{ user.address }</label>
    </div>
  </div>
</div>);

ProfileSidebar.propTypes = {
  user: PropTypes.shape({
    photo: PropTypes.string,
    name: PropTypes.string,
    phone: PropTypes.string,
    email: PropTypes.string,
    address: PropTypes.string,
  }),
};

export default ProfileSidebar;
