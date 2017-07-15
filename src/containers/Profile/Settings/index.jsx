import React from 'react';

import {
  Header,
  Footer,
  Form,
  Field,
  Button,
} from 'components';
import UserProfile from 'components/UserProfile';

import baseStyles from 'containers/Layout/style.css';
import styles from './style.css';

const ProfileSettings = () => {
  const navItems = [{
    name: 'Мои объявления',
    link: '/profile',
  }, {
    name: 'Настройки',
    link: '/profile/settings',
    isActive: true,
  }];

  return (
    <div className={baseStyles.page}>
      <Header />

      <UserProfile navigationItems={navItems}>
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
      </UserProfile>

      <Footer />
    </div>
  );
};

export default ProfileSettings;
