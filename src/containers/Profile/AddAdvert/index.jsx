import React from 'react';
import PropTypes from 'prop-types';
import { compose, withHandlers } from 'recompose';
import { connect } from 'react-redux';
import { replace } from 'react-router-redux';
import moment from 'moment';

import {
  Form,
  Field,
  Select,
  Button,
  Files,
} from 'components';

import api from 'containers/Advert/api';
import { api as userApi } from 'containers/User';

import styles from './style.css';

const sendHandler = ({ dispatch }) => (data) => {
  const date = moment().locale('ru').format('DD MMMM, YYYY');
  const token = JSON.parse(localStorage.getItem('token')).key;

  dispatch(userApi.actions.currentUser({}, {
    body: JSON.stringify({
      token,
    }),
  })).then((user) => {
    dispatch(api.actions.addAdvert({}, {
      body: JSON.stringify({
        ...data,
        date,
        userId: user._id, // eslint-disable-line no-underscore-dangle
        image: '/images/ad-image.jpg',
      }),
    })).then((resp) => {
      dispatch(replace('/advert/594ecac278f4a815841338e0'));

      return resp;
    });
  });
};

const AddAdvert = ({ send }) => (
  <div>
    <h3 className={styles.title}>Добавление объявления</h3>

    <Form className={styles.form} encType="multipart/form-data" model="addAdvert" onSubmit={send}>
      <Field
        type="text"
        model=".title"
        placeholder="Заголовок"
      />

      <Field
        type="number"
        model=".price"
        placeholder="Цена"
      />

      <Select
        model=".category"
        placeholder="Выберите категорию"
        items={[{
          caption: 'Одежда',
          value: 'clothes',
        }, {
          caption: 'Обувь',
          value: 'footwear',
        }, {
          caption: 'Детские товары',
          value: 'goods',
        }]}
      />

      <Field
        type="textarea"
        model=".description"
        placeholder="Описание"
      />

      <Files
        model=" "
        caption="Выберите изображение"
      />

      <div className={styles.divider} />

      <Button
        type="primary"
        caption="Добавить"
        className={styles.button}
      />
    </Form>
  </div>
  );

AddAdvert.propTypes = {
  send: PropTypes.func.isRequired,
};

export default compose(
  connect(),
  withHandlers({
    send: sendHandler,
  }),
)(AddAdvert);
