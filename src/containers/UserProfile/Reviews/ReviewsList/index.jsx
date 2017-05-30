import React, { PropTypes } from 'react';
import classNames from 'classnames';

import Card from 'components/Card';
import Button from 'components/Button';

import styles from './style.css';

const ReviewsList = ({
  className,
}) => {
  const reviews = [{
    id: '1',
    image: '/images/user-image.jpg',
    title: 'Василий Петров',
    caption: 'Хороший продавец, не обманывает',
    link: '/user/1',
  }, {
    id: '2',
    image: '/images/user-image.jpg',
    title: 'Василий Петров',
    caption: 'Хороший продавец, не обманывает, все отлично, мне понравилось',
    link: '/user/1',
  }, {
    id: '3',
    image: '/images/user-image.jpg',
    title: 'Василий Петров',
    caption: 'Хороший продавец, не обманывает, все отлично',
    link: '/user/1',
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
            className={styles.card}
          />
        ))}
      </div>
    </div>
  );
};

ReviewsList.propTypes = {
  className: PropTypes.string,
};

export default ReviewsList;
