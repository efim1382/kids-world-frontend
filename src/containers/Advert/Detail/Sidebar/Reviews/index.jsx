import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import classNames from 'classnames';

import {
  Card,
  Button,
} from 'components';

import styles from './style.css';

const Reviews = ({ className, userId }) => (
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
        to={`/user/${userId}/reviews`}
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
  userId: PropTypes.string,
};

export default Reviews;
