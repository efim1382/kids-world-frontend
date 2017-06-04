import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import Form from 'components/Form';
import Field from 'components/Form/Field';
import Checkbox from 'components/Form/Checkbox';
import Button from 'components/Button';
import authStyles from 'containers/Auth/style.css';
import styles from './style.css';

class Register extends Component {
  static propTypes = {
    buttonDisabled: PropTypes.bool,
    checkboxChecked: PropTypes.bool,
  };

  defaultProps = {
    buttonDisabled: true,
    checkboxChecked: false,
  }

  state = {
    buttonDisabled: this.defaultProps.buttonDisabled,
  };

  onChangeCheckbox = () => {
    this.setState({
      buttonDisabled: !this.state.buttonDisabled,
    });
  }

  render() {
    return (
      <div>
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

          <Checkbox
            checked={this.defaultProps.checkboxChecked}
            onChange={this.onChangeCheckbox}
          >
            Принимаю условия <Link className={styles.link} to="/">пользовательского соглашения</Link>
          </Checkbox>

          <Button
            type="primary"
            disabled={this.state.buttonDisabled}
            caption="Зарегистрироваться"
            className={authStyles.button}
          />
        </Form>
      </div>
    );
  }
}

export default Register;
