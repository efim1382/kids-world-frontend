import React from 'react';

import {
  Form,
  Field,
  Select,
  Button,
} from 'components';

import styles from './style.css';

const EditAdvert = () => (
  <div>
    <h3 className={styles.title}>Редактирование объявления</h3>

    <Form className={styles.form}>
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

      <Button
        type="primary"
        caption="Изменить"
        className={styles.button}
      />
    </Form>
  </div>
  );

export default EditAdvert;
