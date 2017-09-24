import React, { Component } from 'react';
import { compose, withHandlers } from 'recompose';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { uploadPath } from 'configuration';

import {
  Button,
  Modal,
  Form,
  Files,
} from 'components';

import { api as userApi } from 'containers/User';

import styles from './style.css';

const filterImage = (image) => {
  if (image === 'images/user-image.jpg') {
    return `/${image}`;
  }

  return `${uploadPath}/${image}`;
};

const sendHandler = ({ dispatch }) => (data, $this) => {
  const token = JSON.parse(localStorage.getItem('token')).key;

  dispatch(userApi.actions.currentUser({}, {
    body: JSON.stringify({
      token,
    }),
  })).then((user) => {
    const newData = new FormData();
    newData.append('photo', data.photo[0]);

    // eslint-disable-next-line no-underscore-dangle
    dispatch(userApi.actions.updatePhoto({ id: user._id }, {
      body: newData,
    })).then((resp) => {
      $this.setState({
        userPhoto: filterImage(resp.photo),
      });

      return resp;
    });
  });
};

class ProfileSidebar extends Component {
  static propTypes = {
    user: PropTypes.shape({
      photo: PropTypes.string,
      name: PropTypes.string,
      phone: PropTypes.string,
      email: PropTypes.string,
      address: PropTypes.string,
    }),
    changePhoto: PropTypes.bool,
    send: PropTypes.func,
  };

  state = {
    showModal: false,
    userPhoto: '',
  }

  render() {
    const { user, changePhoto, send } = this.props;

    return (<div className={styles.profileSidebar}>
      <header className={styles.header}>
        {user.photo && <div
          className={styles.image}
          style={{ backgroundImage: `url(${this.state.userPhoto || filterImage(user.photo)})` }}
        >
          {changePhoto && <Button
            type="transparent"
            className={styles.uploadButton}
            icon="add_a_photo"
            onClick={() => {
              this.setState({
                showModal: true,
              });
            }}
          />}
        </div>}

        <p className={styles.name}>{ user.name }</p>
      </header>

      <h3 className={styles.title}>Контакты</h3>

      <div className={styles.properties}>
        <div className={styles.property}>
          <label className={styles.label}>Телефон:</label>
          <label className={styles.value}>{ user.phone }</label>
        </div>

        <div className={styles.property}>
          <label className={styles.label}>Почта:</label>
          <label className={styles.value}>{ user.email }</label>
        </div>

        <div className={styles.property}>
          <label className={styles.label}>Адрес:</label>
          <label className={styles.value}>{ user.address }</label>
        </div>
      </div>

      {changePhoto && <Modal
        title="Добавление новой фотографии"
        show={this.state.showModal}
        className={styles.modal}
        onClose={() => {
          this.setState({
            showModal: false,
          });
        }}
      >
        <p className={styles.uploadText}>
          Загрузите свою настоящую фотографию
          <br />
          Вы можете загрузить фотографию только в форматах JPG, GIF или PNG
        </p>

        <Form
          model="updatePhoto"
          getRef={(node) => { this.uploadForm = node; }}
          className={styles.uploadForm}
          onSubmit={(data) => {
            send(data, this);
          }}
        >
          <Files
            model=".photo" onChange={() => {
              this.setState({
                showModal: false,
              });

            // Не успевает почему то попадать данные формы в data
            // Поэтому ставим setTimeout на 0
              setTimeout(() => {
                this.uploadForm.submit();
              }, 0);
            }}
          />
        </Form>
      </Modal>}
    </div>);
  }
}

export default compose(
  connect(),
  withHandlers({
    send: sendHandler,
  }),
)(ProfileSidebar);
