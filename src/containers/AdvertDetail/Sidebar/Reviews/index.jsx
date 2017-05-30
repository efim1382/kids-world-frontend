import React, { PropTypes } from 'react';
import classNames from 'classnames';

import Card from 'components/Card';

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
        className={styles.card}
      />

      <Card
        image="/images/user-image.jpg"
        title="Василий Петров"
        caption="Хороший продавец, не обманывает, все отлично, мне понравилось"
        size="big"
        link="/user/2"
        className={styles.card}
      />

      <Card
        image="/images/user-image.jpg"
        title="Василий Петров"
        caption="Хороший продавец, не обманывает, все отлично, мне понравилось"
        size="big"
        link="/user/3"
        className={styles.card}
      />
    </div>
  </div>
);

Reviews.propTypes = {
  className: PropTypes.string,
};

export default Reviews;
