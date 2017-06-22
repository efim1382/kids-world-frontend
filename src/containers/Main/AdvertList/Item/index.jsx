import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import Card from 'components/Card';
import Button from 'components/Button';
import styles from './style.css';

const Advert = ({
  id,
  title,
  image,
  userImage,
  userName,
  date,
  price,
  category,
  adress,
}) => <div className={styles.advert}>
  <div className={styles.image} style={{ backgroundImage: `url(${image}` }} />

  <div className={styles.section}>
    <div className={styles.header}>
      <Card
        image={userImage}
        title={userName}
        caption={date}
        className={styles.card}
        link="/user/1"
      />
      
      <span className={styles.price}>{ price } р.</span>
    </div>

    <h3 className={styles.title}>{ title }</h3>
    <p className={styles.text}>{ category }</p>
    <p className={styles.text}>{ adress }</p>

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
</div>;

Advert.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  userImage: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  category: PropTypes.string.isRequired,
  adress: PropTypes.string.isRequired,
};

export default Advert;
