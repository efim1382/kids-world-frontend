import React from 'react';
import PropTypes from 'prop-types';
import { compose, withHandlers } from 'recompose';
import { connect } from 'react-redux';
import { replace } from 'react-router-redux';
import { Form, Field, Select, Files, Button } from 'components';
import categories from 'containers/Profile/Adverts/categories';
import { addAdvert } from '../actions';
import styles from './style.css';

const sendHandler = ({ dispatch }) => (data) => {
  const userId = localStorage.getItem('id');

  dispatch(addAdvert(data, userId)).then((resp) => {
    if (resp.status !== 200) {
      return;
    }

    dispatch(replace(`/advert/${resp.advert.id}`));
  });
};

const Add = ({ send }) => <div className={styles.add}>
  <h3>Добавление объявления</h3>

  <Form model="addAdvert" onSubmit={send}>
    <Field
      caption="Заголовок"
      model=".title"
    />

    <Field
      caption="Цена"
      model=".price"
      type="number"
    />

    <Select
      caption="Категория"
      model=".category"
      items={categories}
    />

    <Field
      caption="Описание"
      model=".description"
      type="textarea"
    />

    <Files caption="Выберите изображение" model=".image" withContainer />
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
