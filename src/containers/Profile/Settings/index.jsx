import React from 'react';
import PropTypes from 'prop-types';
import { compose, withHandlers } from 'recompose';
import { connect } from 'react-redux';
import { replace } from 'react-router-redux';

import {
  Form,
  Field,
  Button,
} from 'components';

import { api as userApi } from 'containers/User';
import { resetToken } from 'containers/Auth/actions';

import styles from './style.css';

const sendEmailHandler = ({ dispatch }) => (data, id) => {
  dispatch(userApi.actions.updateEmail({ id }, {
    body: JSON.stringify(data),
  })).then(() => {
    dispatch(replace('/profile/'));
  });
};

const sendPhoneHandler = ({ dispatch }) => (data, id) => {
  dispatch(userApi.actions.updatePhone({ id }, {
    body: JSON.stringify(data),
  })).then(() => {
    dispatch(replace('/profile/'));
  });
};

const sendAddressHandler = ({ dispatch }) => (data, id) => {
  dispatch(userApi.actions.updateAddress({ id }, {
    body: JSON.stringify(data),
  })).then(() => {
    dispatch(replace('/profile/'));
  });
};

const sendPasswordHandler = ({ dispatch }) => (data, user) => {
  if (data.oldPassword !== user.password) return;

  // eslint-disable-next-line no-underscore-dangle
  dispatch(userApi.actions.updatePassword({ id: user._id }, {
    body: JSON.stringify({
      password: data.newPassword,
    }),
  })).then(() => {
    dispatch(replace('/profile/'));
  });
};

const ProfileSettings = ({
  dispatch,
  user,
  sendEmail,
  sendPhone,
  sendAddress,
  sendPassword,
}) => <div>
  <div className={styles.section}>
    <h3 className={styles.title}>Контактные данные</h3>

    {user.email && <Form
      className={styles.form}
      model="updateEmail"
      onSubmit={data => sendEmail(data, user._id)} // eslint-disable-line no-underscore-dangle
    >
      <Field
        defaultValue={user.email}
        model=".email"
        type="email"
        caption="Почта"
      />

      <Button
        type="primary"
        caption="Изменить"
        className={styles.button}
      />
      </Form>}

    {user.email && <div className={styles.divider} />}

    {user.phone && <Form
      className={styles.form}
      model="updatePhone"
      onSubmit={data => sendPhone(data, user._id)} // eslint-disable-line no-underscore-dangle
    >
      <Field
        defaultValue={user.phone}
        model=".phone"
        type="text"
        caption="Телефон"
      />

      <Button
        type="primary"
        caption="Изменить"
        className={styles.button}
      />
      </Form>}

    {user.phone && <div className={styles.divider} />}

    {user.address && <Form
      className={styles.form}
      model="updateAddress"
      onSubmit={data => sendAddress(data, user._id)} // eslint-disable-line no-underscore-dangle
    >
      <Field
        defaultValue={user.address}
        model=".address"
        type="text"
        caption="Адрес"
      />

      <Button
        type="primary"
        caption="Изменить"
        className={styles.button}
      />
      </Form>}
  </div>

  <div className={styles.section}>
    <h3 className={styles.title}>Безопасность</h3>

    <Form className={styles.form} model="updatePassword" onSubmit={data => sendPassword(data, user)}>
      <Field
        model=".oldPassword"
        type="password"
        caption="Старый пароль"
      />

      <Field
        model=".newPassword"
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
      onClick={() => {
        const token = JSON.parse(localStorage.getItem('token')).key;

        if (!token) {
          return;
        }

        dispatch(userApi.actions.deleteProfile({}, {
          body: JSON.stringify({
            token,
          }),
        })).then((resp) => {
          if (resp.status === 200) {
            dispatch(resetToken());
            dispatch(replace('/'));
          }
        });
      }}
    />
  </div>
</div>;

ProfileSettings.propTypes = {
  sendEmail: PropTypes.func,
  sendPhone: PropTypes.func,
  sendAddress: PropTypes.func,
  sendPassword: PropTypes.func,
  dispatch: PropTypes.func,
  user: PropTypes.shape({
    photo: PropTypes.string,
    name: PropTypes.string,
    phone: PropTypes.string,
    email: PropTypes.string,
    address: PropTypes.string,
    password: PropTypes.string,
  }),
};

export default compose(
  connect(),
  withHandlers({
    sendEmail: sendEmailHandler,
    sendPhone: sendPhoneHandler,
    sendAddress: sendAddressHandler,
    sendPassword: sendPasswordHandler,
  }),
)(ProfileSettings);
