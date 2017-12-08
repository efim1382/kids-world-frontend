import React from 'react';
import PropTypes from 'prop-types';
import { compose, withHandlers } from 'recompose';
import { connect } from 'react-redux';
import { Form, Field, Select } from 'components';
import RaisedButton from 'material-ui/RaisedButton';
import styles from './style.css';

const sendHandler = ({ dispatch }) => (data) => {
  console.log(data);
};

const Add = ({ send }) => <div className={styles.add}>
  <h3>Добавление объявления</h3>

  <Form model=" " onSubmit={send}>
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

    <RaisedButton
      primary
      type="submit"
      label="Добавить"
      className={styles.submit}
    />
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
