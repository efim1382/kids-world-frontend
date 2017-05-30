import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import classNames from 'classnames';

import Card from 'components/Card';
import Button from 'components/Button';

import styles from './style.css';

const Reviews = ({ className }) => (
  <div className={classNames(styles.reviews, className)}>
    <h3 className={styles.title}>Отзывы о продавце</h3>

    <div className={styles.section}>
      <Card
        image="/images/user-image.jpg"
        title="Василий Петров"
        caption="Хороший продавец, не обманывает, все отлично, мне понравилось"
        size="big"
        link="/user/1"
        emotion="like"
        className={styles.card}
      />

      <Card
        image="/images/user-image.jpg"
        title="Василий Петров"
        caption="Хороший продавец, не обманывает, все отлично, мне понравилось"
        size="big"
        link="/user/2"
        emotion="dislike"
        className={styles.card}
      />

      <Card
        image="/images/user-image.jpg"
        title="Василий Петров"
        caption="Хороший продавец, не обманывает, все отлично, мне понравилось"
        size="big"
        link="/user/3"
        emotion="like"
        className={styles.card}
      />

      <Link
        to='/user/1/reviews'
        className={styles.button}
      >
        <Button
          type="primary"
          caption="Посмотреть все"
        />
      </Link>
    </div>
  </div>
);

Reviews.propTypes = {
  className: PropTypes.string,
};

export default Reviews;
