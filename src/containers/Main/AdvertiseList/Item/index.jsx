import React, { PropTypes } from 'react';
import Card from 'components/Card';
import Button from 'components/Button';
import styles from './style.css';

const Advertise = ({
  title,
  image,
  userImage,
  userName,
  date,
  price,
  category,
  adress,
}) => <div className={styles.advertise}>
  <div className={styles.image} style={{ backgroundImage: `url(${image}` }} />

  <div className={styles.section}>
    <Card
      image={userImage}
      title={userName}
      caption={date}
      link="/"
    />

    <h3 className={styles.title}>{ title }</h3>
    <p className={styles.text}>{ category }</p>
    <p className={styles.text}>{ adress }</p>

    <Button
      type="primary"
      caption="Подробнее"
      className={styles.detailButton}
    />

    <span className={styles.price}>{ price } р.</span>
  </div>

</div>;

Advertise.propTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  userImage: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  category: PropTypes.string.isRequired,
  adress: PropTypes.string.isRequired,
};

export default Advertise;
