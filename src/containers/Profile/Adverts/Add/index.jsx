import React from 'react';
import PropTypes from 'prop-types';
import { compose, withHandlers } from 'recompose';
import { connect } from 'react-redux';
import { Form, Field, Select, Files, Button } from 'components';

import api from '../api';

import styles from './style.css';

const sendHandler = ({ dispatch }) => (data) => {
  const newData = new FormData();
  newData.append('userId', 1);
  newData.append('title', data.title);
  newData.append('image', data.image[0]);
  newData.append('price', data.price);
  newData.append('category', data.category);
  newData.append('description', data.description.split('\n').join('<br />'));

  dispatch(api.actions.addAdvert({}, {
    body: newData,
  })).then((response) => {
    console.log(response);
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
