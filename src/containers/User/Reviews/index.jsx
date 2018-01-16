import React, { Component } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import UUID from 'node-uuid';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { filterUserPhoto } from 'helpers/filters';
import { Card, Form, Field, Button } from 'components';
import reviewsApi from 'store/reviews';
import styles from './style.css';

class Reviews extends Component {
  static propTypes = {
    userId: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),

    params: PropTypes.shape({
      id: PropTypes.string,
    }),

    reviews: PropTypes.arrayOf(PropTypes.shape({
      idAuthor: PropTypes.number,
      image: PropTypes.string,
      firstName: PropTypes.string,
      lastName: PropTypes.string,
      text: PropTypes.string,
      emotion: PropTypes.string,
    })),

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

  render() {
    const {
      reviews, createReview, params: { id }, userId,
    } = this.props;

    return <div className={styles.reviews}>
      <div className={styles.container}>
        {_.isEmpty(reviews) && <div className={styles.emptyMessage}>
          Об этом продавце еще никто не оставляли отзывы
        </div>}

        {!this.state.formShown && userId && <Button
          caption="Оставить отзыв"
          appearance="primary"

          onClick={() => {
            this.setState({
              formShown: true,
            });
          }}
        />}

        {this.state.formShown && userId && <Form
          model="createReview"
          onSubmit={(data) => {
          if (!data.review || !this.state.emotion) {
            return;
          }

          createReview({}, {
            body: JSON.stringify({
              idAuthor: userId,
              idRecipient: id,
              emotion: this.state.emotion,
              text: data.review,
            }),
          }).then(() => {
            this.loadData();

            this.setState({
              formShown: false,
              emotion: null,
            });
          });
        }}>
          <Field caption="" model=".review" type="textarea" className={styles.field} />

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
            name={`${review.firstName} ${review.lastName}`}
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
    userId: parseInt(localStorage.getItem('id'), 10) || '',
    reviews: _.get(state, 'reviews.getUserReviews.data.data', []),
  }),

  {
    getUserReviews: reviewsApi.actions.getUserReviews.sync,
    createReview: reviewsApi.actions.createReview.sync,
  },
)(Reviews);
