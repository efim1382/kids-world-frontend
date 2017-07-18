import React from 'react';
import PropTypes from 'prop-types';
import { compose, withHandlers } from 'recompose';
import { connect } from 'react-redux';
import { replace } from 'react-router-redux';
import moment from 'moment';

import {
  Form,
  Field,
  Textarea,
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
    const newData = new FormData();
    newData.append('userId', user._id); // eslint-disable-line no-underscore-dangle
    newData.append('title', data.title);
    newData.append('image', data.image[0]);
    newData.append('date', date);
    newData.append('price', data.price);
    newData.append('category', data.category);
    newData.append('description', data.description.split('\n').join('<br />'));

    dispatch(api.actions.addAdvert({}, {
      body: newData,
    })).then((resp) => {
      dispatch(replace(`/advert/${resp._id}`)); // eslint-disable-line no-underscore-dangle

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

      <Textarea
        model=".description"
        placeholder="Описание"
      />

      <Files
        model=".image"
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
