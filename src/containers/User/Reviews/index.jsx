import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { get } from 'lodash';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { compose, withHandlers, withProps } from 'recompose';
import { uploadPath } from 'configuration';

import {
  Card,
  Button,
  Form,
  Field,
  Radio,
} from 'components';

import { getUsers } from 'containers/User/actions';

import { reviewsApi, getUserReviews } from 'store/reviews';
import api from 'containers/User/api';

import styles from './style.css';

const filterImage = (image) => {
  if (image === 'images/user-image.jpg') {
    return `/${image}`;
  }

  return `${uploadPath}/${image}`;
};

const sendHandler = ({ dispatch }) => (data, $this) => {
  const { params: { id } } = $this.props;
  const token = JSON.parse(localStorage.getItem('token')).key;

  if (!token) {
    return;
  }

  dispatch(api.actions.currentUser({}, {
    body: JSON.stringify({
      token,
    }),
  })).then((user) => {
    dispatch(reviewsApi.actions.addReview({}, {
      body: JSON.stringify({
        ...data,
        idUserFrom: user._id, // eslint-disable-line no-underscore-dangle
        idUserTo: id,
      }),
    })).then((resp) => {
      $this.setState({
        isReviewFormShow: false,
      });

      $this.props.getUserReviews(id);

      return resp;
    });
  });
};

class Reviews extends Component {
  static propTypes = {
    params: PropTypes.objectOf(PropTypes.string),
    className: PropTypes.string,
    send: PropTypes.func,
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

  state = {
    isReviewFormShow: false,
  };

  componentWillMount() {
    const { params: { id } } = this.props;

    this.props.getUserReviews(id).then(() => {
      this.props.getUsers();
    });
  }

  getFullReviews = () => {
    const { reviews, users } = this.props;
    const array = [];

    if (!reviews.data || !users.data) {
      return false;
    }

    reviews.data.forEach((review) => {
      // eslint-disable-next-line no-underscore-dangle
      const author = users.data.filter(user => user._id === review.idUserFrom)[0];

      if (author) {
        array.push({
          id: review._id, // eslint-disable-line no-underscore-dangle
          image: filterImage(author.photo),
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
    const { className, send } = this.props;
    const reviews = this.getFullReviews();

    return (
      <div className={classNames(styles.reviewsListPage, className)}>
        <div className={styles.addReviewContainer}>
          {!this.state.isReviewFormShow && <Button
            type="primary"
            caption="Добавить отзыв"
            className={styles.button}
            onClick={() => {
              this.setState({
                isReviewFormShow: true,
              });
            }}
          />}

          {this.state.isReviewFormShow && <Form
            model="addReview"
            className={styles.reviewsForm}
            onSubmit={(data) => {
              send(data, this);
            }}
          >
            <Field
              type="text"
              model=".text"
              placeholder="Введите ваш отзыв"
              className={styles.reviewsField}
            />

            <div className={styles.reviewsEmotions}>
              <Radio
                model=".emotion"
                icon="thumb_up"
                value="like"
                className={styles.reviewsRadio}
              />

              <Radio
                model=".emotion"
                icon="thumb_down"
                value="dislike"
                className={styles.reviewsRadio}
              />
            </div>

            <Button
              type="transparent"
              icon="send"
              className={styles.reviewsSubmit}
            />
          </Form>}
        </div>

        <div className={styles.reviewsList}>
          {reviews && reviews.map(review => <Card
            key={review.id}
            size="big"
            className={styles.card}
            {...review}
          />)}
        </div>
      </div>
    );
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
  withHandlers({
    send: sendHandler,
  }),
)(Reviews);

