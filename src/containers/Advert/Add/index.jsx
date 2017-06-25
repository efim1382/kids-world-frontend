import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { replace } from 'react-router-redux';
import moment from 'moment';

import Header from 'components/Header';
import Footer from 'components/Footer';
import UserProfile from 'components/UserProfile';
import Form from 'components/Form/Form';
import Field from 'components/Form/Field';
import Files from 'components/Form/Files';
import Select from 'components/Form/Select';
import Button from 'components/Button';

import api from 'containers/Advert/api';

import baseStyles from 'containers/Layout/style.css';
import styles from './style.css';

class AddAdvert extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
  };

  data = {}

  titleOnChange = (event) => {
    this.data.title = event.target.value;
  }

  descriptionOnChange = (event) => {
    this.data.description = event.target.value;
  }

  priceOnChange = (event) => {
    this.data.price = event.target.value;
  }

  categoryOnChange = (event) => {
    this.data.category = event.target.value;
  }

  send = () => {
    const { dispatch } = this.props;

    this.data.date = moment().locale('ru').format('DD MMMM, YYYY');

    dispatch(api.actions.addAdvert({}, {
      body: JSON.stringify({
        ...this.data,
        image: '/images/ad-image.jpg',
        userImage: '/images/user-image.jpg',
        userName: 'Василий Петров',
        adress: 'Ростов-на-Дону, Красноармейская, 231',
      }),
    })).then((resp) => {
      dispatch(replace('/advert/594ecac278f4a815841338e0'));

      return resp;
    });
  }

  render() {
    return (
      <div className={baseStyles.page}>
        <Header />

        <UserProfile>
          <h3 className={styles.title}>Добавление объявления</h3>

          <Form
            className={styles.form}
            onSubmit={this.send}
          >
            <Field
              type="text"
              caption="Заголовок"
              onChange={this.titleOnChange}
            />

            <Field
              type="number"
              caption="Цена"
              onChange={this.priceOnChange}
            />

            <Select
              caption="Категория"
              defaultSelect="Выберите категорию"
              onChange={this.categoryOnChange}
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

            <Files
              caption="Изображение"
            />

            <Field
              type="textarea"
              caption="Описание"
              onChange={this.descriptionOnChange}
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

export default connect()(AddAdvert);
