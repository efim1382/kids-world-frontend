import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Button } from 'components';
import { filterUserPhoto } from 'helpers/filters';
import styles from './style.css';

const UserProfile = ({
  name,
  phone,
  email,
  address,
  photo,
  editablePhoto,
  handlePhotoClick,
  children,
  className,
}) => <div className={styles.profile}>
  <div className={styles.sidebar}>
    <header className={styles.header}>
      <div className={styles.userImage} style={{ '--image': filterUserPhoto(photo) }}>
        {editablePhoto && <Button
          icon="create"
          className={styles.photoButton}
          onClick={handlePhotoClick}
        />}
      </div>
      <p className={styles.userName}>{ name }</p>
    </header>

    <div className={styles.properties}>
      <h3>Контакты</h3>

      <div className={styles.property}>
        <label className={styles.propertyName}>Телефон:</label>
        <label className={styles.propertyValue}>{ phone }</label>
      </div>

      <div className={styles.property}>
        <label className={styles.propertyName}>Почта:</label>
        <label className={styles.propertyValue}>{ email }</label>
      </div>

      <div className={styles.property}>
        <label className={styles.propertyName}>Адрес:</label>
        <label className={styles.propertyValue}>{ address }</label>
      </div>
    </div>
  </div>

  <div className={classNames(styles.content, className)}>{ children }</div>
</div>;

UserProfile.propTypes = {
  name: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  photo: PropTypes.string.isRequired,
  editablePhoto: PropTypes.bool,
  handlePhotoClick: PropTypes.func,
  className: PropTypes.string,
  children: PropTypes.node,
};

export default UserProfile;
