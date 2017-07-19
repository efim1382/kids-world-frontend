import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { uploadPath } from 'configuration';

import {
  Card,
  Button,
} from 'components';

import styles from './style.css';

const filterImage = (image) => {
  if (image === 'images/user-image.jpg') {
    return `/${image}`;
  }

  return `${uploadPath}/${image}`;
};

const filterCategory = (category) => {
  switch (category) {
    case 'clothes':
      return 'Одежда';
    case 'footwear':
      return 'Обувь';
    case 'goods':
      return 'Детские товары';
    default:
      return category;
  }
};

const Advert = ({
  id,
  title,
  image,
  userImage,
  userName,
  userId,
  date,
  price,
  category,
  address,
}) => {
  const newImage = (image === 'images/ad-image.jpg') ? `/${image}` : `${uploadPath}/${image}`;

  return (<div className={styles.advert}>
    <div className={styles.image} style={{ backgroundImage: `url(${newImage})` }} />

    <div className={styles.section}>
      <div className={styles.header}>
        <Card
          image={filterImage(userImage)}
          title={userName}
          caption={date}
          className={styles.card}
          link={`/user/${userId}`}
        />

        <span className={styles.price}>{ price } р.</span>
      </div>

      <h3 className={styles.title}>{ title }</h3>
      <p className={styles.text}>{ filterCategory(category) }</p>
      <p className={styles.text}>{ address }</p>

      <Link
        to={`/advert/${id}`}
        className={styles.detailButton}
      >
        <Button
          type="primary"
          caption="Подробнее"
        />
      </Link>
    </div>
  </div>);
};

Advert.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  userImage: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  category: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
};

export default Advert;
