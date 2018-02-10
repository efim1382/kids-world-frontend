import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { replace } from 'react-router-redux';
import { Form, Field, Files, Button, Modal } from 'components';
import { showNotification } from 'components/Notification/actions';
import api from '../api';
import styles from './style.css';

class Register extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
  };

  state = {
    isModalShown: false,
  };

  closeModal = () => {
    this.setState({ isModalShown: false });
  };

  openModal = () => {
    this.setState({ isModalShown: true });
  };

  sendHandler = (data) => {
    const { dispatch } = this.props;

    if (
      !data.name ||
      !data.email ||
      !data.address ||
      !data.password
    ) {
      dispatch(showNotification('Заполните все поля'));
      return;
    }

    const body = new FormData();
    body.append('name', data.name);
    body.append('email', data.email);
    body.append('address', data.address);
    body.append('password', data.password);

    if (data.photo) {
      body.append('photo', data.photo[0]);
    }

    dispatch(api.actions.register({}, { body })).then((response) => {
      if (response.status !== 200) {
        dispatch(showNotification(response.message));
        return;
      }

      localStorage.setItem('id', response.user.id);
      localStorage.setItem('token', response.user.token);
      dispatch(replace('/profile'));
    });
  };

  render() {
    return (<div className={styles.register}>
      <h3 className={styles.title}>Добро пожаловать!</h3>

      <p className={styles.subcaption}>
        Зарегистрируйтесь, чтобы размещать объявления, хранить избранное и прочее
      </p>

      <Form className={styles.form} model="register" onSubmit={this.sendHandler}>
        <div className={styles.image}>
          <Button
            icon="photo_camera"
            type="button"
            className={styles.addPhotoButton}
            onClick={this.openModal}
          />
        </div>

        <Field
          caption="Полное имя"
          type="text"
          model=".name"
          className={styles.field}
        />

        <Field
          caption="Эл. почта"
          type="email"
          model=".email"
          className={styles.field}
        />

        <Field
          caption="Придумайте пароль"
          type="password"
          model=".password"
          className={styles.field}
        />

        <Field
          caption="Ваш адрес"
          type="text"
          model=".address"
          className={styles.field}
        />

        <Modal
          show={this.state.isModalShown}
          title="Загрузка фотографии"
          className={styles.modal}
          handleClose={this.closeModal}
        >
          <p>Загрузите свою настоящую фотографию.</p>
          <p>Вы можете загрузить фотографию только в форматах JPG, GIF или PNG.</p>

          <Files
            model=".photo"
            onChange={this.closeModal}
            className={styles.files}
          />
        </Modal>

        <Button
          type="submit"
          appearance="primary"
          caption="Зарегистрироваться"
          className={styles.submit}
        />
      </Form>
    </div>);
  }
}

export default connect()(Register);
