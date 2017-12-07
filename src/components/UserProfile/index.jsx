import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './style.css';

const UserProfile = ({ children, className }) => <div className={styles.profile}>
  <div className={styles.sidebar}>
    <header className={styles.header}>
      <div className={styles.userImage} style={{ backgroundImage: 'url(/images/user-image.jpg)' }} />
      <p className={styles.userName}>Иван Петров</p>
    </header>

    <div className={styles.properties}>
      <h3>Контакты</h3>

      <div className={styles.property}>
        <label className={styles.propertyName}>Телефон:</label>
        <label className={styles.propertyValue}>+7 909 40 79 312</label>
      </div>

      <div className={styles.property}>
        <label className={styles.propertyName}>Почта:</label>
        <label className={styles.propertyValue}>efim1382@gmail.com</label>
      </div>

      <div className={styles.property}>
        <label className={styles.propertyName}>Адрес:</label>
        <label className={styles.propertyValue}>Ростов-на-Дону, пер. Гвардейский, 6</label>
      </div>
    </div>
  </div>

  <div className={classNames(styles.content, className)}>{ children }</div>
</div>;

UserProfile.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

export default UserProfile;
