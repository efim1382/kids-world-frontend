import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Form, Field, Select, Files, Button } from 'components';
import moment from 'moment';
import { showNotification } from 'components/Notification/actions';
import categories from 'containers/Profile/Adverts/categories';
import advertApi from 'containers/Profile/Adverts/api';
import styles from './style.css';

class Add extends Component {
  static propTypes = {
    userId: PropTypes.number.isRequired,
    addAdvert: PropTypes.func.isRequired,
    showMessage: PropTypes.func.isRequired,
    pushUrl: PropTypes.func.isRequired,
  };

  componentDidMount() {
    document.addEventListener('keydown', this.handleDocumentKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleDocumentKeyDown);
  }

  handleDocumentKeyDown = (event) => {
    const { pushUrl } = this.props;

    if (event.keyCode === 27) {
      pushUrl('/profile/adverts');
    }
  }

  handleSubmit = (data) => {
    const {
      userId, addAdvert, showMessage, pushUrl,
    } = this.props;

    const body = new FormData();
    body.append('title', data.title);
    body.append('price', data.price);
    body.append('category', data.category);
    body.append('date', moment().locale('ru').format('DD MMMM, YYYY'));
    body.append('description', data.description.split('\n').join('<br />'));
    body.append('image', data.image[0]);
    body.append('userId', userId);

    addAdvert({}, {
      body,
    }).then((responce) => {
      if (responce.status !== 200) {
        showMessage(responce.message);
        return;
      }

      pushUrl(`/advert/${responce.advert.id}`);
    });
  };

  render() {
    return <div className={styles.add}>
      <h3>Добавление объявления</h3>

      <Form model="addAdvert" onSubmit={this.handleSubmit}>
        <Field
          caption="Заголовок"
          model=".title"
        />

        <Field
          caption="Цена"
          model=".price"
          type="number"
        />

        <Select
          caption="Категория"
          model=".category"
          items={categories}
        />

        <Field
          caption="Описание"
          model=".description"
          type="textarea"
        />

        <Files caption="Выберите изображение" model=".image" withContainer />
        <div className={styles.divider} />
        <Button appearance="primary" caption="Добавить" className={styles.submit} />
      </Form>
    </div>;
  }
}

export default connect(
  () => ({
    userId: parseInt(localStorage.getItem('id'), 10) || null,
  }),

  {
    addAdvert: advertApi.actions.addAdvert.sync,
    showMessage: showNotification,
    pushUrl: push,
  },
)(Add);
