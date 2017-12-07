import React from 'react';
import { Form, Input, Select } from 'components';
import RaisedButton from 'material-ui/RaisedButton';
import styles from './style.css';

const Add = () => <div className={styles.add}>
  <h3>Добавление объявления</h3>

  <Form model=" " onSubmit={() => {}}>
    <Input
      label="Заголовок"
      model=".title"
    />

    <Input
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

    <Input
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

export default Add;
