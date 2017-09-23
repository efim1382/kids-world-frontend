import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { compose, withHandlers, withProps } from 'recompose';
import { connect } from 'react-redux';
import { replace } from 'react-router-redux';

import {
  Form,
  Field,
  Textarea,
  Select,
  Files,
  Button,
} from 'components';

import { getOneAdvert } from 'containers/Advert/actions';
import { api } from 'containers/Advert';
import { api as userApi } from 'containers/User';

import styles from './style.css';

const sendHandler = ({ dispatch }) => (data, id) => {
  const token = JSON.parse(localStorage.getItem('token')).key;

  dispatch(userApi.actions.currentUser({}, {
    body: JSON.stringify({
      token,
    }),
  })).then((user) => {
    let newData;

    if (data.image !== undefined) {
      const formData = new FormData();

      formData.append('userId', user._id); // eslint-disable-line no-underscore-dangle
      formData.append('image', data.image[0]);
      formData.append('title', data.title);
      formData.append('price', data.price);
      formData.append('category', data.category);
      formData.append('description', data.description.split('\n').join('<br />'));
      newData = formData;
    } else {
      newData = JSON.stringify(data);
    }

    dispatch(api.actions.editAdvert({ id }, {
      body: newData,
    })).then((resp) => {
      dispatch(replace(`/advert/${id}`));

      return resp;
    });
  });
};

class EditAdvert extends Component {
  static propTypes = {
    params: PropTypes.objectOf(PropTypes.string),
    send: PropTypes.func,
    getOneAdvert: PropTypes.func.isRequired,
    advert: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.string,
      price: PropTypes.number,
      category: PropTypes.string,
      description: PropTypes.string,
    })),
  };

  componentWillMount() {
    const { params: { id } } = this.props;
    this.props.getOneAdvert(id);
  }

  render() {
    const { advert, send, params: { id } } = this.props;
    const thisAdvert = advert[0];

    return (<div>
      <h3 className={styles.title}>Редактирование объявления</h3>

      {thisAdvert && <Form model="editAdvert" className={styles.form} onSubmit={data => send(data, id)}>
        <Field
          type="text"
          model=".title"
          placeholder="Заголовок"
          defaultValue={thisAdvert.title}
        />

        <Field
          type="number"
          model=".price"
          placeholder="Цена"
          defaultValue={thisAdvert.price.toString()}
        />

        <Select
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
          defaultValue={thisAdvert.category}
        />

        <Textarea
          model=".description"
          placeholder="Описание"
          defaultValue={thisAdvert.description}
        />

        <Files
          model=".image"
          caption="Выберите изображение"
          withFilesStore
        />

        <Button
          type="primary"
          caption="Изменить"
          className={styles.button}
        />
      </Form>}
    </div>);
  }
}

export default compose(
  connect(state => ({
    advert: state.adverts.list,
  })),
  withHandlers({
    send: sendHandler,
  }),
  withProps(({ dispatch }) => bindActionCreators({ getOneAdvert }, dispatch)),
)(EditAdvert);
