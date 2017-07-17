import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { get } from 'lodash';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { compose, withHandlers, withProps } from 'recompose';

import {
  Card,
  Button,
  Form,
  Field,
  Radio,
} from 'components';

import { getUsers } from 'containers/User/actions';

import { reviewsApi, getReviews } from 'store/reviews';
import api from 'containers/User/api';

import styles from './style.css';

const sendHandler = ({ dispatch }) => (data, idUserTo, $this) => {
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
        idUserTo,
      }),
    })).then((resp) => {
      $this.setState({
        isReviewFormShow: false,
      });

      $this.props.getReviews();

      return resp;
    });
  });
};

class Reviews extends Component {
  static propTypes = {
    params: PropTypes.objectOf(PropTypes.string),
    className: PropTypes.string,
    send: PropTypes.func,
    getReviews: PropTypes.func,
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
    this.props.getReviews().then(() => {
      this.props.getUsers();
    });
  }

  getFullReviews = () => {
    const { reviews, users } = this.props;
    const array = [];

    if (!reviews.data) {
      return false;
    }

    reviews.data.forEach((review) => {
      if (users.data) {
        // eslint-disable-next-line no-underscore-dangle
        const author = users.data.filter(user => user._id === review.idUserFrom)[0];

        if (author) {
          array.push({
            id: review._id, // eslint-disable-line no-underscore-dangle
            image: author.photo,
            title: author.name,
            caption: review.text,
            link: `/user/${author._id}`, // eslint-disable-line no-underscore-dangle
            emotion: review.emotion,
          });
        }
      }
    });

    return array;
  }

  render() {
    const { className, send, params: { id } } = this.props;
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
              send(data, id, this);
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
      reviews: get(state, 'reviews.reviews.data', {}),
      users: get(state, 'users.getUsers.data', {}),
    }),
  ),
  withProps(({ dispatch }) => bindActionCreators({ getReviews, getUsers }, dispatch)),
  withHandlers({
    send: sendHandler,
  }),
)(Reviews);

