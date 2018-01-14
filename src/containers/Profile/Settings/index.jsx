import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { compose, lifecycle } from 'recompose';
import { connect } from 'react-redux';
import { Form, Field, Button } from 'components';
import userApi from 'containers/User/api';
import styles from './style.css';

const Settings = ({ user }) => <div className={styles.settings}>
  <h3>Изменить адрес</h3>

  <Form model=" " onSubmit={() => {}}>
    <Field
      placeholder="Адрес"
      model=".address"
      defaultValue={user.address}
    />

    <Button appearance="primary" caption="Изменить" />
  </Form>

  <h3>Изменить телефон</h3>

  <Form model=" " onSubmit={() => {}}>
    <Field
      placeholder="Номер телефона"
      model=".phone"
      defaultValue={user.phone}
    />

    <Button appearance="primary" caption="Изменить" />
  </Form>

  <h3>Изменить почту</h3>

  <Form model=" " onSubmit={() => {}}>
    <Field
      placeholder="Эл. почта"
      model=".email"
      defaultValue={user.email}
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

Settings.propTypes = {
  user: PropTypes.shape({
    address: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }).isRequired,
};

export default compose(
  connect(
    state => ({
      user: _.get(state, 'users.currentUser.data', {}),
    }),

    {
      currentUser: userApi.actions.currentUser.sync,
    },
  ),

  lifecycle({
    componentWillMount() {
      const token = localStorage.getItem('token');

      this.props.currentUser({}, {
        body: JSON.stringify({ token }),
      });
    },
  }),
)(Settings);
