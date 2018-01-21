import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { compose, lifecycle } from 'recompose';
import { connect } from 'react-redux';
import { replace } from 'react-router-redux';
import { Form, Field, Select, Files, Button } from 'components';
import { showNotification } from 'components/Notification/actions';
import categories from 'containers/Profile/Adverts/categories';
import { filterAdvertImage } from 'helpers/filters';
import advertsApi from '../api';
import styles from './style.css';

const Edit = ({
  advert,
  editAdvert,
  showMessage,
  redirect,
  params: { id },
}) => <div className={styles.edit}>
  <h3>Редактирование объявления</h3>

  {!_.isEmpty(advert) && <Form
    model="editAdvert"

    onSubmit={(data) => {
      const body = new FormData();
      body.append('title', data.title);
      body.append('price', data.price);
      body.append('category', data.category);
      body.append('description', data.description.split('\n').join('<br />'));

      if (!_.isEmpty(data.image)) {
        body.append('image', data.image[0]);
      }

      editAdvert({ id }, {
        body,
      }).then((responce) => {
        if (responce.status !== 200) {
          showMessage(responce.message);
          return;
        }

        redirect(`/advert/${id}`);
      });
    }}
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

  // eslint-disable-next-line react/no-unused-prop-types
  getAdvert: PropTypes.func.isRequired,
  redirect: PropTypes.func.isRequired,
  showMessage: PropTypes.func.isRequired,
  editAdvert: PropTypes.func.isRequired,
};

export default compose(
  connect(
    state => ({
      advert: _.get(state, 'adverts.getAdvert.data.advert', {}),
    }),

    {
      editAdvert: advertsApi.actions.editAdvert.sync,
      getAdvert: advertsApi.actions.getAdvert,
      redirect: replace,
      showMessage: showNotification,
    },
  ),

  lifecycle({
    componentWillMount() {
      const { params: { id } } = this.props;
      this.props.getAdvert({ id });
    },
  }),
)(Edit);
