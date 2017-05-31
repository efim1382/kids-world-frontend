import React from 'react';

import Form from 'components/Form';
import Field from 'components/Form/Field';
import Button from 'components/Button';

import authStyles from 'containers/Auth/style.css';

const Register = () => <div>
  <h2 className={authStyles.title}>Регистрация</h2>

  <Form className={authStyles.form}>
    <Field
      type="text"
      placeholder="Имя"
    />
    <Field
      type="email"
      placeholder="Email"
    />
    <Field
      type="text"
      placeholder="Телефон"
    />
    <Field
      type="text"
      placeholder="Адрес"
    />
    <Field
      type="password"
      placeholder="Пароль"
    />
    <Button
      type="primary"
      caption="Войти"
      className={authStyles.button}
    />
  </Form>
</div>;

export default Register;
