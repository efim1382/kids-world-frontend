import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose, withHandlers } from 'recompose';
import { connect } from 'react-redux';
import { replace } from 'react-router-redux';
import moment from 'moment';

import Header from 'components/Header';
import Footer from 'components/Footer';
import UserProfile from 'components/UserProfile';
import Form from 'components/Form/Form';
import Field from 'components/Form/Field';
import Button from 'components/Button';

import api from 'containers/Advert/api';

import baseStyles from 'containers/Layout/style.css';
import styles from './style.css';

const sendHandler = ({ dispatch }) => data => {
  let date = moment().locale('ru').format('DD MMMM, YYYY');

  dispatch(api.actions.addAdvert({}, {
    body: JSON.stringify({
      ...data,
      date,
      image: '/images/ad-image.jpg',
      userImage: '/images/user-image.jpg',
      userName: 'Василий Петров',
      address: 'Ростов-на-Дону, Красноармейская, 231',
    }),
  })).then(resp => {
    dispatch(replace('/advert/594ecac278f4a815841338e0'));

    return resp;
  });
};

class AddAdvert extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
  };

  render() {
    const { send } = this.props;

    return (
      <div className={baseStyles.page}>
        <Header />

        <UserProfile>
          <h3 className={styles.title}>Добавление объявления</h3>

          <Form className={styles.form} model="addAdvert" onSubmit={send}>
            <Field
              type="text"
              model=".title"
              placeholder="Заголовок"
            />

            <Field
              type="number"
              model=".price"
              placeholder="Цена"
            />

            <Field
              type="select"
              model=".category"
              placeholder="Выберите категорию"
              items={[{
                caption: 'Одежда',
                value: 'clothes',
              }, {
                caption: 'Обувь',
                value: 'footwear',
              }, {
                caption: 'Детские товары',
                value: 'goods',
              }]}
            />

            <Field
              type="textarea"
              model=".description"
              placeholder="Описание"
            />

            <div className={styles.divider} />

            <Button
              type="primary"
              caption="Добавить"
              className={styles.button}
            />
          </Form>
        </UserProfile>

        <Footer />
      </div>
    );
  }
}

export default compose(
  connect(),
  withHandlers({
    send: sendHandler,
  }),
)(AddAdvert);
