import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Card } from 'components';
import { uploadPath } from 'configuration';
import Reviews from './Reviews';
import styles from './style.css';

const filterImage = (image) => {
  if (image === 'images/user-image.jpg') {
    return `/${image}`;
  }

  return `${uploadPath}/${image}`;
};

const AdvertDetail = ({
  user,
  className,
}) => (
  <div className={classNames(styles.sidebar, className)}>
    <Card
      image={filterImage(user.photo)}
      title={user.name}
      caption={user.email}
      link={`/user/${user._id}`} // eslint-disable-line no-underscore-dangle
    />

    <p className={styles.property}>Телефон: {user.phone}</p>
    <p className={styles.property}>Адрес: {user.address}</p>

    <Reviews
      userId={user._id} // eslint-disable-line no-underscore-dangle
    />
  </div>
);

AdvertDetail.propTypes = {
  user: PropTypes.shape({
    photo: PropTypes.string,
    name: PropTypes.string,
    email: PropTypes.string,
    phone: PropTypes.string,
    address: PropTypes.string,
  }),
  className: PropTypes.string,
};

export default AdvertDetail;
