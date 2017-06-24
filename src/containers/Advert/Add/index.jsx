import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Header from 'components/Header';
import Footer from 'components/Footer';
import UserProfile from 'components/UserProfile';
import Form from 'components/Form';
import Field from 'components/Form/Field';
import Select from 'components/Form/Select';
import Button from 'components/Button';

import api from 'containers/Advert/api';

import baseStyles from 'containers/Layout/style.css';
import styles from './style.css';

class AddAdvert extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
  };

  data = {
    title: '',
    description: '',
    category: '',
  }

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

    dispatch(api.actions.addAdvert({}, {
      body: JSON.stringify({
        ...this.data,
        image: '/images/ad-image.jpg',
        userImage: '/images/user-image.jpg',
        userName: 'Василий Петров',
        date: '25 января, 2017',
        adress: 'Ростов-на-Дону, Красноармейская, 231',
      }),
    })).then(resp => resp);
  }

  render() {
    return (
      <div className={baseStyles.page}>
        <Header />

        <UserProfile>
          <Button
            type="primary"
            caption="Добавить"
            className={styles.button}
            onClick={this.send}
          />
          <h3 className={styles.title}>Добавление объявления</h3>

          <Form className={styles.form}>
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
