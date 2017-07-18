import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import classNames from 'classnames';
import { get } from 'lodash';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { compose, withProps } from 'recompose';

import {
  Card,
  Button,
} from 'components';

import { getUsers } from 'containers/User/actions';
import { getUserReviews } from 'store/reviews';

import styles from './style.css';

class Reviews extends Component {
  static propTypes = {
    className: PropTypes.string,
    userId: PropTypes.string.isRequired,
    getUserReviews: PropTypes.func,
    getUsers: PropTypes.func,
    reviews: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.shape({
      emotion: PropTypes.string,
      idUserFrom: PropTypes.string,
      idUserTo: PropTypes.string,
      text: PropTypes.string,
    }))),
    users: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.shape({
      _id: PropTypes.string,
      photo: PropTypes.string,
      name: PropTypes.string,
    }))),
  };

  componentWillMount() {
    const { userId } = this.props;

    this.props.getUserReviews(userId).then(() => {
      this.props.getUsers();
    });
  }

  getFullReviews = () => {
    const { reviews, users } = this.props;
    const array = [];
    let lastReviews = [];

    if (!reviews.data || !users.data) {
      return [];
    }

    if (reviews.data.length > 4) {
      lastReviews = reviews.data.slice(-3);
    } else {
      lastReviews = reviews.data;
    }

    lastReviews.forEach((review) => {
      // eslint-disable-next-line no-underscore-dangle
      const author = users.data.filter(user => user._id === review.idUserFrom)[0];

      if (author) {
        array.push({
          id: review._id, // eslint-disable-line no-underscore-dangle
          image: author.photo,
          title: author.name,
          caption: review.text,
          link: `/user/${review.idUserFrom}`,
          emotion: review.emotion,
        });
      }
    });

    return array;
  }

  render() {
    const { className, userId } = this.props;
    const reviews = this.getFullReviews();

    return (<div className={classNames(styles.reviews, className)}>
      {reviews.length > 0 && <h3 className={styles.title}>Отзывы о продавце</h3>}

      <div className={styles.section}>
        {reviews.length > 0 && reviews.map(review => <Card
          key={review.id}
          size="big"
          className={styles.card}
          {...review}
        />)}

        <Link
          to={`/user/${userId}/reviews`}
          className={styles.button}
        >
          <Button
            type="primary"
            caption={reviews.length > 0 ? 'Посмотреть все' : 'Оставить отзыв о продавце'}
          />
        </Link>
      </div>
    </div>);
  }
}

export default compose(
  connect(
    state => ({
      reviews: get(state, 'reviews.userReviews.data', {}),
      users: get(state, 'users.getUsers.data', {}),
    }),
  ),
  withProps(({ dispatch }) => bindActionCreators({ getUserReviews, getUsers }, dispatch)),
)(Reviews);
