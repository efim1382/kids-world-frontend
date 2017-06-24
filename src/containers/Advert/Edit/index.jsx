import React from 'react';
import Header from 'components/Header';
import Footer from 'components/Footer';
import UserProfile from 'components/UserProfile';
import Form from 'components/Form/Form';
import Field from 'components/Form/Field';
import Select from 'components/Form/Select';
import Button from 'components/Button';
import baseStyles from 'containers/Layout/style.css';
import styles from './style.css';

const EditAdvert = () => <div className={baseStyles.page}>
  <Header />

  <UserProfile>
    <h3 className={styles.title}>Редактирование объявления</h3>

    <Form className={styles.form}>
      <Field
        type="text"
        caption="Заголовок"
      />

      <Select
        caption="Категория"
        defaultSelect="Выберите категорию"
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
      />

      <Button
        type="primary"
        caption="Изменить"
        className={styles.button}
      />
    </Form>
  </UserProfile>

  <Footer />
</div>;

export default EditAdvert;
