import React from 'react';
import Form from 'components/Form';
import Field from 'components/Form/Field';
import Button from 'components/Button';
import authStyles from 'containers/Auth/style.css';

const Login = () => <div>
  <h2 className={authStyles.title}>Авторизация</h2>

  <Form className={authStyles.form}>
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
      className={authStyles.button}
    />
  </Form>
</div>;

export default Login;
