import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { compose, withHandlers } from 'recompose';
import { connect } from 'react-redux';

import {
  Card,
  Button,
  Form,
  Field,
  Radio,
} from 'components';

import styles from './style.css';

const sendHandler = ({ dispatch }) => (data) => {
  console.log(123);
};

class Reviews extends Component {
  static propTypes = {
    className: PropTypes.string,
    send: PropTypes.func,
  };

  state = {
    isReviewFormShow: false,
  };

  render() {
    const { className, send } = this.props;

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

          {this.state.isReviewFormShow && <Form model=" " className={styles.reviewsForm} onSubmit={send}>
            <Field
              type="text"
              model=" "
              placeholder="Введите ваш отзыв"
              className={styles.reviewsField}
            />

            <div className={styles.reviewsEmotions}>
              <Radio
                model=" "
                icon="thumb_up"
                className={styles.reviewsRadio}
              />

              <Radio
                model=" "
                icon="thumb_down"
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
  }
}

export default compose(
  connect(),
  withHandlers({
    send: sendHandler,
  }),
)(Reviews);
