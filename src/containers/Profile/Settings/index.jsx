import React from 'react';

import {
  Form,
  Field,
  Button,
} from 'components';

import styles from './style.css';

const ProfileSettings = () => <div>
  <div className={styles.section}>
    <h3 className={styles.title}>Контактные данные</h3>

    <Form className={styles.form} model=" ">
      <Field
        value=""
        model=" "
        type="email"
        caption="Почта"
      />

      <Button
        type="primary"
        caption="Изменить"
        className={styles.button}
      />
    </Form>

    <div className={styles.divider} />

    <Form className={styles.form} model=" ">
      <Field
        value=""
        model=" "
        type="text"
        caption="Телефон"
      />

      <Button
        type="primary"
        caption="Изменить"
        className={styles.button}
      />
    </Form>

    <div className={styles.divider} />

    <Form className={styles.form} model=" ">
      <Field
        value=""
        model=" "
        type="text"
        caption="Адрес"
      />

      <Button
        type="primary"
        caption="Изменить"
        className={styles.button}
      />
    </Form>
  </div>

  <div className={styles.section}>
    <h3 className={styles.title}>Безопасность</h3>

    <Form className={styles.form} model=" ">
      <Field
        value=""
        model=" "
        type="password"
        caption="Старый пароль"
      />

      <Field
        value=""
        model=" "
        type="password"
        caption="Новый пароль"
      />

      <Button
        type="primary"
        caption="Изменить"
        className={styles.button}
      />
    </Form>
  </div>

  <div className={styles.section}>
    <h3 className={styles.title}>Удаление аккаунта</h3>

    <Button
      type="danger"
      caption="Удалить"
      className={styles.button}
    />
  </div>
</div>;

export default ProfileSettings;
