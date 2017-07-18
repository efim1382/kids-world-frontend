import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { get } from 'lodash';

import AdvertList from 'components/AdvertList';

import { api } from 'containers/Advert';

class Adverts extends Component {
  static propTypes = {
    params: PropTypes.objectOf(PropTypes.string),
    getUserAdverts: PropTypes.func,
    adverts: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.shape({
      image: PropTypes.string,
      title: PropTypes.string,
    }))),
  };

  componentDidMount() {
    const { params: { id } } = this.props;

    this.props.getUserAdverts({ id });
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
        link: `/advert/${id}`,
      });
    });

    return array;
  };

  render() {
    const adverts = this.filterAdverts();

    return (<div>
      {adverts && adverts.length > 0 && <AdvertList items={adverts} caption="Подробнее" />}
    </div>);
  }
}

export default compose(
  connect(
    state => ({
      adverts: get(state, 'adverts.getUserAdverts.data', {}),
    }),
    {
      getUserAdverts: api.actions.getUserAdverts.sync,
    },
  ),
)(Adverts);
