import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { get } from 'lodash';

import AdvertList from 'components/AdvertList';

import { api as userApi } from 'containers/User';
import { api } from 'containers/Advert';

class Adverts extends Component {
  static propTypes = {
    getUserAdverts: PropTypes.func,
    currentUser: PropTypes.func,
    adverts: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.shape({
      image: PropTypes.string,
      title: PropTypes.string,
    }))),
  };

  componentDidMount() {
    const token = JSON.parse(localStorage.getItem('token')).key;

    if (!token) {
      return;
    }

    this.props.currentUser({}, {
      body: JSON.stringify({
        token,
      }),
    }).then((user) => {
      this.props.getUserAdverts({ id: user._id }); // eslint-disable-line no-underscore-dangle
    });
  }

  filterAdverts = () => {
    const { adverts } = this.props;
    const array = [];

    if (!adverts.data) return [];

    adverts.data.forEach((advert) => {
      const id = advert._id; // eslint-disable-line no-underscore-dangle

      array.push({
        id,
        image: advert.image,
        title: advert.title,
        link: `/profile/advert/edit/${id}`,
      });
    });

    return array;
  };

  render() {
    const adverts = this.filterAdverts();

    return (<div>
      {adverts && adverts.length > 0 && <AdvertList items={adverts} caption="Редактировать" />}
    </div>);
  }
}

export default compose(
  connect(
    state => ({
      adverts: get(state, 'adverts.getUserAdverts.data', {}),
      user: get(state, 'users.currentUser.data', {}),
    }),
    {
      getUserAdverts: api.actions.getUserAdverts.sync,
      currentUser: userApi.actions.currentUser.sync,
    },
  ),
)(Adverts);
