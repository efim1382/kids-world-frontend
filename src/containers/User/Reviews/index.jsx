import React, { Component } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import UUID from 'node-uuid';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { filterUserPhoto } from 'helpers/filters';
import { showNotification } from 'components/Notification/actions';
import { Card, Form, Field, Button } from 'components';
import reviewsApi from 'store/reviews';
import styles from './style.css';

class Reviews extends Component {
  static propTypes = {
    userId: PropTypes.number,

    params: PropTypes.shape({
      id: PropTypes.string,
    }),

    reviews: PropTypes.arrayOf(PropTypes.shape({
      idAuthor: PropTypes.number,
      image: PropTypes.string,
      name: PropTypes.string,
      text: PropTypes.string,
      emotion: PropTypes.string,
    })),

    showMessage: PropTypes.func.isRequired,
    getUserReviews: PropTypes.func.isRequired,
    createReview: PropTypes.func.isRequired,
  };

  state = {
    formShown: false,
    emotion: null,
  };

  componentWillMount() {
    this.loadData();
  }

  loadData = () => {
    const { getUserReviews, params: { id } } = this.props;
    getUserReviews({ id });
  };

  openReviewForm = () => {
    this.setState({
      formShown: true,
    });
  };

  closeReviewForm = () => {
    this.setState({
      formShown: false,
      emotion: null,
    });
  };

  handleSubmitReview = (data) => {
    const {
      createReview, params: { id }, userId, showMessage,
    } = this.props;

    if (!data.review) {
      showMessage('Укажите текст отзыва');
      return;
    }

    if (!this.state.emotion) {
      showMessage('Укажите оценку отзыва');
      return;
    }

    createReview({}, {
      body: JSON.stringify({
        idAuthor: userId,
        idRecipient: id,
        emotion: this.state.emotion,
        text: data.review,
      }),
    }).then((responce) => {
      if (responce.status !== 200) {
        showMessage(responce.message);
        return;
      }

      this.loadData();
      this.closeReviewForm();
    });
  };

  render() {
    const { reviews, userId } = this.props;

    return <div className={styles.reviews}>
      <div className={styles.container}>
        {_.isEmpty(reviews) && !this.state.formShown && <div className={styles.emptyMessage}>
          Об этом продавце еще не оставляли отзывы
        </div>}

        {!this.state.formShown && userId && <Button
          caption="Оставить отзыв"
          appearance="primary"
          onClick={this.openReviewForm}
        />}

        {this.state.formShown && userId && <Form
          model="createReview"
          onSubmit={this.handleSubmitReview}
        >
          <Field model=".review" type="textarea" className={styles.field} />

          <div className={styles.tooltip}>
            <Button
              type="button"
              icon="thumb_up"

              className={
                classNames(styles.like, this.state.emotion === 'like' ? styles.active : '')
              }

              onClick={() => {
                this.setState({
                  ...this.state,
                  emotion: 'like',
                });
              }}
            />

            <Button
              type="button"
              icon="thumb_down"

              className={
                classNames(styles.dislike, this.state.emotion === 'dislike' ? styles.active : '')
              }

              onClick={() => {
                this.setState({
                  ...this.state,
                  emotion: 'dislike',
                });
              }}
            />

            <Button icon="send" className={styles.send} type="submit" />
          </div>
        </Form>}

        {!_.isEmpty(reviews) && <div className={styles.list}>
          {reviews.map(review => <Card
            key={UUID.v4()}
            image={filterUserPhoto(review.photo)}
            link={`/user/${review.idAuthor}`}
            name={review.name}
            text={review.text}
            emotion={review.emotion}
            className={styles.card}
            multiple
          />)}
        </div>}
      </div>
    </div>;
  }
}

export default connect(
  state => ({
    userId: parseInt(localStorage.getItem('id'), 10) || null,
    reviews: _.get(state, 'reviews.getUserReviews.data.reviews', []),
  }),

  {
    getUserReviews: reviewsApi.actions.getUserReviews.sync,
    createReview: reviewsApi.actions.createReview.sync,
    showMessage: showNotification,
  },
)(Reviews);
