import React from 'react';
import PropTypes from 'prop-types';
import { compose, withHandlers } from 'recompose';
import { connect } from 'react-redux';
import { replace } from 'react-router-redux';

import { Form, Field, Select, Files, Button } from 'components';

import categories from 'containers/Profile/Adverts/categories';

import { api as userApi } from 'containers/User';
import { addAdvert } from '../actions';

import styles from './style.css';

const sendHandler = ({ dispatch }) => (data) => {
  const token = JSON.parse(localStorage.getItem('token')).key;

  dispatch(userApi.actions.currentUser({}, {
    body: JSON.stringify({
      token,
    }),
  })).then((responce) => {
    if (responce.status !== 200) {
      return;
    }

    const userId = responce.user.id;

    dispatch(addAdvert(data, userId)).then((resp) => {
      if (resp.status !== 200) {
        return;
      }

      dispatch(replace('/'));
    });
  });
};

const Add = ({ send }) => <div className={styles.add}>
  <h3>Добавление объявления</h3>

  <Form model="addAdvert" onSubmit={send}>
    <Field
      label="Заголовок"
      model=".title"
    />

    <Field
      label="Цена"
      model=".price"
      type="number"
    />

    <Select
      label="Категория"
      model=".category"
      items={categories}
    />

    <Field
      label="Описание"
      model=".description"
      type="textarea"
    />

    <Files model=".image" label="Выберите изображение" className={styles.files} />
    <div className={styles.divider} />
    <Button appearance="primary" caption="Добавить" className={styles.submit} />
  </Form>
</div>;

Add.propTypes = {
  send: PropTypes.func.isRequired,
};

export default compose(
  connect(),

  withHandlers({
    send: sendHandler,
  }),
)(Add);
