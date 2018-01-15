import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { compose, lifecycle } from 'recompose';
import { connect } from 'react-redux';
import { replace } from 'react-router-redux';
import { Form, Field, Select, Files, Button } from 'components';
import categories from 'containers/Profile/Adverts/categories';
import { filterAdvertImage } from 'helpers/filters';
import { editAdvertWithImage } from '../actions';
import advertsApi from '../api';
import styles from './style.css';

const sendCallback = (dispatch, id) => {
  dispatch(replace(`/advert/${id}`));
};

const sendHandler = (data, id) => (dispatch) => {
  if (_.has(data, 'image')) {
    dispatch(editAdvertWithImage(data, id)).then(() => {
      sendCallback(dispatch, id);
    });
  }

  dispatch(advertsApi.actions.editAdvert({ id }, {
    body: JSON.stringify(data),
  })).then(() => {
    sendCallback(dispatch, id);
  });
};

const Edit = ({ send, advert, params: { id } }) => <div className={styles.edit}>
  <h3>Редактирование объявления</h3>

  {!_.isEmpty(advert) && <Form
    model="editAdvert"
    onSubmit={(data) => {
      send(data, id);
    }
  }
  >
    <Field
      caption="Заголовок"
      model=".title"
      defaultValue={advert.title}
    />

    <Field
      caption="Цена"
      model=".price"
      type="number"
      defaultValue={advert.price}
    />

    <Select
      caption="Категория"
      model=".category"
      items={categories}
      defaultValue={advert.category}
    />

    <Field
      caption="Описание"
      model=".description"
      type="textarea"
      defaultValue={advert.description}
    />

    <Files caption="Выберите изображение" model=".image" defaultImage={filterAdvertImage(advert.mainImage)} withContainer />
    <div className={styles.divider} />
    <Button appearance="primary" caption="Изменить" className={styles.submit} />
  </Form>}
</div>;

Edit.propTypes = {
  send: PropTypes.func.isRequired,

  params: PropTypes.shape({
    id: PropTypes.string,
  }),

  advert: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
    category: PropTypes.string,
    description: PropTypes.string,
    mainImage: PropTypes.string,
  }),
};

export default compose(
  connect(
    state => ({
      advert: _.get(state, 'adverts.getAdvert.data', {}),
    }),

    {
      send: sendHandler,
      getAdvert: advertsApi.actions.getAdvert,
    },
  ),

  lifecycle({
    componentWillMount() {
      const { params: { id } } = this.props;
      this.props.getAdvert({ id });
    },
  }),
)(Edit);
