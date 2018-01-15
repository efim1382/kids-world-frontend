import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { replace } from 'react-router-redux';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { Form, Field, Button } from 'components';
import userApi from 'containers/User/api';
import styles from './style.css';

const Settings = ({
  user, redirect, updateProfile, changeAddress, changePhone, changeEmail, changePassword,
}) => <div className={styles.settings}>
  <h3>Изменить адрес</h3>

  <Form
    model="changeAddress"
    onSubmit={(data) => {
      changeAddress({}, {
        body: JSON.stringify({
          id: user.id,
          address: data.address,
        }),
      }).then(() => {
        updateProfile();
        redirect('/profile');
      });
    }
  }>
    <Field
      placeholder="Адрес"
      model=".address"
      defaultValue={user.address}
    />

    <Button appearance="primary" caption="Изменить" />
  </Form>

  <h3>Изменить телефон</h3>

  <Form
    model="changePhone"
    onSubmit={(data) => {
      changePhone({}, {
        body: JSON.stringify({
          id: user.id,
          phone: data.phone,
        }),
      }).then(() => {
        updateProfile();
        redirect('/profile');
      });
    }
  }>
    <Field
      placeholder="Номер телефона"
      model=".phone"
      defaultValue={user.phone}
    />

    <Button appearance="primary" caption="Изменить" />
  </Form>

  <h3>Изменить почту</h3>

  <Form
    model="changeEmail"
    onSubmit={(data) => {
      changeEmail({}, {
        body: JSON.stringify({
          id: user.id,
          email: data.email,
        }),
      }).then(() => {
        updateProfile();
        redirect('/profile');
      });
    }
  }>
    <Field
      placeholder="Эл. почта"
      model=".email"
      defaultValue={user.email}
    />

    <Button appearance="primary" caption="Изменить" />
  </Form>

  <h3>Изменить пароль</h3>

  <Form
    model="changePassword"
    onSubmit={(data) => {
      changePassword({}, {
        body: JSON.stringify({
          id: user.id,
          password: data.password,
          newPassword: data.newPassword,
          confirmNewPassword: data.confirmNewPassword,
        }),
      }).then(() => {
        updateProfile();
        redirect('/profile');
      });
    }
  }>
    <Field
      placeholder="Текущий пароль"
      model=".password"
      type="password"
    />

    <Field
      placeholder="Новый пароль"
      model=".newPassword"
      type="password"
    />

    <Field
      placeholder="Повторите новый пароль"
      model=".confirmNewPassword"
      type="password"
    />

    <Button appearance="primary" caption="Изменить" />
  </Form>

  <div className={styles.divider} />

  <Button appearance="danger" caption="Удалить профиль" />
</div>;

Settings.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    address: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }).isRequired,

  redirect: PropTypes.func.isRequired,
  updateProfile: PropTypes.func.isRequired,
  changeAddress: PropTypes.func.isRequired,
  changePhone: PropTypes.func.isRequired,
  changeEmail: PropTypes.func.isRequired,
  changePassword: PropTypes.func.isRequired,
};

export default compose(connect(
  state => ({
    user: _.get(state, 'users.currentUser.data', {}),
  }),

  {
    changeAddress: userApi.actions.changeAddress.sync,
    changePhone: userApi.actions.changePhone.sync,
    changeEmail: userApi.actions.changeEmail.sync,
    changePassword: userApi.actions.changePassword.sync,
    redirect: replace,
  },
))(Settings);
