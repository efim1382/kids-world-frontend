import React from 'react';
import PropTypes from 'prop-types';
import { compose, withHandlers } from 'recompose';
import { connect } from 'react-redux';
import { replace } from 'react-router-redux';

import { Form, Field, Select, Files, Button } from 'components';

import { addAdvert } from '../actions';

import styles from './style.css';

const sendHandler = ({ dispatch }) => (data) => {
  dispatch(addAdvert(data)).then((responce) => {
    if (responce.status !== 200) {
      return;
    }

    dispatch(replace('/'));
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

      items={[
        {
          name: 'Одежда',
          value: 'clothes',
        },

        {
          name: 'Обувь',
          value: 'footwear',
        },

        {
          name: 'Детские товары',
          value: 'goods',
        },
      ]}
    />

    <Field
      label="Описание"
      model=".description"
      type="textarea"
    />

    <Files model=".image" label="Выберите изображение" multiple className={styles.files} />

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
