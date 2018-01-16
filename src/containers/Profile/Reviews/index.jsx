import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import UUID from 'node-uuid';
import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';
import { filterUserPhoto } from 'helpers/filters';
import { Card } from 'components';
import reviewsApi from 'store/reviews';
import styles from './style.css';

const Reviews = ({ reviews }) => <div className={styles.reviews}>
  {!_.isEmpty(reviews) && <div className={styles.list}>
    {reviews.map(review => <Card
      key={UUID.v4()}
      image={filterUserPhoto(review.photo)}
      link={`/user/${review.idAuthor}`}
      name={`${review.firstName} ${review.lastName}`}
      text={review.text}
      emotion={review.emotion}
      className={styles.card}
      multiple
    />)}
  </div>}

  {_.isEmpty(reviews) && <div className={styles.emptyMessage}>
    О Вас еще не оставляли отзывов
  </div>}
</div>;

Reviews.propTypes = {
  reviews: PropTypes.arrayOf(PropTypes.shape({
    idAuthor: PropTypes.number,
    image: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    text: PropTypes.string,
    emotion: PropTypes.string,
  })),

  // eslint-disable-next-line react/no-unused-prop-types
  userId: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,

  // eslint-disable-next-line react/no-unused-prop-types
  getUserReviews: PropTypes.func.isRequired,
};

export default compose(
  connect(
    state => ({
      userId: parseInt(localStorage.getItem('id'), 10) || '',
      reviews: _.get(state, 'reviews.getUserReviews.data.data', []),
    }),

    {
      getUserReviews: reviewsApi.actions.getUserReviews.sync,
    },
  ),

  lifecycle({
    componentWillMount() {
      const { getUserReviews, userId } = this.props;
      getUserReviews({ id: userId });
    },
  }),
)(Reviews);
