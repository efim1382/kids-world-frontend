import React from 'react';
import { Form, Field, Button } from 'components';
import styles from './style.css';

const Settings = () => <div className={styles.settings}>
  <h3>Изменить адрес</h3>

  <Form model=" " onSubmit={() => {}}>
    <Field
      placeholder="Адрес"
      model=".address"
    />

    <Button appearance="primary" caption="Изменить" />
  </Form>

  <h3>Изменить телефон</h3>

  <Form model=" " onSubmit={() => {}}>
    <Field
      placeholder="Номер телефона"
      model=".phone"
    />

    <Button appearance="primary" caption="Изменить" />
  </Form>

  <h3>Изменить почту</h3>

  <Form model=" " onSubmit={() => {}}>
    <Field
      placeholder="Эл. почта"
      model=".email"
    />

    <Button appearance="primary" caption="Изменить" />
  </Form>

  <h3>Изменить пароль</h3>

  <Form model=" " onSubmit={() => {}}>
    <Field
      placeholder="Текущий пароль"
      model=".password"
    />

    <Field
      placeholder="Новый пароль"
      model=".newPassword"
    />

    <Field
      placeholder="Повторите новый пароль"
      model=".confirmNewPassword"
    />

    <Button appearance="primary" caption="Изменить" />
  </Form>

  <div className={styles.divider} />

  <Button appearance="danger" caption="Удалить профиль" />
</div>;

export default Settings;
