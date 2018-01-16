import React from 'react';
import PropTypes from 'prop-types';
import { Route, IndexRedirect } from 'react-router';
import { replace } from 'react-router-redux';
import User from './';
import Adverts from './Adverts';
import Reviews from './Reviews';

const Routes = store => <Route
  path="user/:id"
  component={User}

  onEnter={(props) => {
    const { params: { id } } = props;
    const userId = localStorage.getItem('id');

    if (!userId) {
      return;
    }

    if (userId !== id) {
      return;
    }

    store.dispatch(replace('/profile'));
  }}
>
  <IndexRedirect to="adverts" />
  <Route path="adverts" component={Adverts} />
  <Route path="reviews" component={Reviews} />
</Route>;

Routes.propTypes = {
  params: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
};

export default Routes;
