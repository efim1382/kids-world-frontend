import React from 'react';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import styles from './style.css';

const Card = ({ image, link, name, text }) => <div className={styles.card}>
  {image && <div className={styles.image} style={{ '--image': 'url("/images/user-image.jpg")' }} />}

  <div className={styles.section}>
    <Link to={link} className={styles.link}>{ name }</Link>
    <p className={styles.text}>{ text }</p>
  </div>
</div>;

Card.propTypes = {
  image: PropTypes.string,
  link: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default Card;
