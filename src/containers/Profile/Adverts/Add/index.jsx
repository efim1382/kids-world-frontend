import React from 'react';
import PropTypes from 'prop-types';
import { compose, withHandlers } from 'recompose';
import { connect } from 'react-redux';
import { replace } from 'react-router-redux';

import { Form, Button } from 'components';

import styles from './style.css';

const Add = () => <div className={styles.add}>
  <h3>Добавление объявления</h3>

  <Form model="addAdvert" onSubmit={send}>
    <Button appearance="primary" caption="Добавить" className={styles.submit} />
  </Form>
</div>;

Add.propTypes = {
};

export default compose(
  connect(),
)(Add);
