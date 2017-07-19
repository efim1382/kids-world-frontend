import React from 'react';
import PropTypes from 'prop-types';
import { compose, withHandlers } from 'recompose';
import { connect } from 'react-redux';
import { replace } from 'react-router-redux';

import {
  Form,
  Field,
  Textarea,
  Select,
  Files,
  Button,
} from 'components';

import { api } from 'containers/Advert';
import { api as userApi } from 'containers/User';

import styles from './style.css';

const sendHandler = ({ dispatch }) => (data, $this) => {
  const { params: { id } } = $this.props;
  const token = JSON.parse(localStorage.getItem('token')).key;


  dispatch(userApi.actions.currentUser({}, {
    body: JSON.stringify({
      token,
    }),
  })).then((user) => {
    let newData;

    if (data.image !== undefined) {
      const formData = new FormData();

      formData.append('userId', user._id); // eslint-disable-line no-underscore-dangle
      formData.append('image', data.image[0]);
      formData.append('title', data.title);
      formData.append('price', data.price);
      formData.append('category', data.category);
      formData.append('description', data.description.split('\n').join('<br />'));
      newData = formData;
    } else {
      newData = data;
    }

    dispatch(api.actions.editAdvert({ id }, {
      body: newData,
    })).then((resp) => {
      dispatch(replace(`/advert/${id}`));

      return resp;
    });
  });
};

const EditAdvert = ({ send }) => (<div>
  <h3 className={styles.title}>Редактирование объявления</h3>

  <Form model="editAdvert" className={styles.form} onSubmit={data => send(data, this)}>
    <Field
      type="text"
      model=".title"
      placeholder="Заголовок"
      defaultValue="asd"
    />

    <Field
      type="number"
      model=".price"
      placeholder="Цена"
      defaultValue="32432"
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
      defaultValue="goods"
    />

    <Textarea
      model=".description"
      placeholder="Описание"
      defaultValue="goods"
    />

    <Files
      model=".image"
      caption="Выберите изображение"
      withFilesStore
    />

    <Button
      type="primary"
      caption="Изменить"
      className={styles.button}
    />
  </Form>
</div>);

EditAdvert.propTypes = {
  send: PropTypes.func,
};

export default compose(
  connect(),
  withHandlers({
    send: sendHandler,
  }),
)(EditAdvert);
