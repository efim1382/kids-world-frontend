import React from 'react';
import classNames from 'classnames';

import Header from 'components/Header';
import Footer from 'components/Footer';
import Form from 'components/Form';
import Field from 'components/Form/Field';
import Button from 'components/Button';

import baseStyles from 'containers/Layout/style.css';

import styles from './style.css';

const Main = () => <div className={baseStyles.page}>
  <Header />

  <div className={classNames(baseStyles.content, styles.auth)}>
    <div className={styles.formWrapper}>
      <h2 className={styles.title}>Авторизация</h2>

      <Form className={styles.form}>
        <Field
          type="email"
          placeholder="Email"
        />
        <Field
          type="password"
          placeholder="Пароль"
        />
        <Button
          type="primary"
          caption="Войти"
          className={styles.button}
        />
      </Form>
    </div>
  </div>

  <Footer />
</div>;

export default Main;
