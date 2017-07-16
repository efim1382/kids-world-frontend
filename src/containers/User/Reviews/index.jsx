import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import {
  Card,
  Button,
} from 'components';

import styles from './style.css';

const Reviews = ({
  className,
}) => {
  const reviews = [{
    id: '1',
    image: '/images/user-image.jpg',
    title: 'Василий Петров',
    caption: 'Хороший продавец, не обманывает',
    link: '/user/1',
    emotion: 'like',
  }, {
    id: '2',
    image: '/images/user-image.jpg',
    title: 'Василий Петров',
    caption: 'Хороший продавец, не обманывает, все отлично, мне понравилось',
    link: '/user/1',
    emotion: 'dislike',
  }, {
    id: '3',
    image: '/images/user-image.jpg',
    title: 'Василий Петров',
    caption: 'Хороший продавец, не обманывает, все отлично',
    link: '/user/1',
    emotion: 'like',
  }];

  return (
    <div className={classNames(styles.reviewsListPage, className)}>
      <Button
        type="primary"
        caption="Добавить отзыв"
        className={styles.button}
      />

      <div className={styles.reviewsList}>
        {reviews.map(review => (
          <Card
            key={review.id}
            image={review.image}
            title={review.title}
            caption={review.caption}
            size="big"
            link={review.link}
            emotion={review.emotion}
            className={styles.card}
          />
        ))}
      </div>
    </div>
  );
};

Reviews.propTypes = {
  className: PropTypes.string,
};

export default Reviews;
