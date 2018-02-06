import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Button, Icon } from 'components';
import { filterUserPhoto } from 'helpers/filters';
import styles from './style.css';

const UserProfile = ({
  id,
  name,
  phone,
  email,
  address,
  photo,
  editablePhoto,
  handlePhotoClick,
  children,
  className,
  dispatch,
}) => <div className={styles.profile}>
  <div className={styles.sidebar}>
    <header className={styles.header}>
      <div className={styles.userImage} style={{ '--image': filterUserPhoto(photo) }}>
        {editablePhoto && <Button
          icon="photo_camera"
          className={styles.photoButton}
          onClick={handlePhotoClick}
        />}
      </div>
      <p className={styles.userName}>{ name }</p>
    </header>

    <div className={styles.properties}>
      <h3>Контакты</h3>

      <div className={styles.property}>
        <Icon name="phone" className={styles.icon} />
        <label className={styles.propertyValue}>{ phone }</label>
      </div>

      <div className={styles.property}>
        <Icon name="email" className={styles.icon} />
        <label className={styles.propertyValue}>{ email }</label>
      </div>

      <div className={styles.property}>
        <Icon name="home" className={styles.icon} />
        <label className={styles.propertyValue}>{ address }</label>
      </div>
    </div>

    {id && <Button
      caption="Написать пользователю"
      appearance="primary"
      className={styles.button}

      onClick={() => {
        dispatch(push(`/profile/chat/${id}`));
      }}
    />}
  </div>

  <div className={classNames(styles.content, className)}>{ children }</div>
</div>;

UserProfile.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  photo: PropTypes.string.isRequired,
  editablePhoto: PropTypes.bool,
  handlePhotoClick: PropTypes.func,
  dispatch: PropTypes.func,
  className: PropTypes.string,
  children: PropTypes.node,
};

export default connect()(UserProfile);
