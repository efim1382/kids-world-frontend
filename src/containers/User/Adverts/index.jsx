import React, { Component } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { filterImage } from 'helpers/filters';
import advertsApi from 'containers/Profile/Adverts/api';
import { CardAdvert } from 'components';
import styles from './style.css';

class Adverts extends Component {
  static propTypes = {
    adverts: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      mainImage: PropTypes.string,
    })),

    params: PropTypes.shape({
      id: PropTypes.string,
    }),

    getUserAdverts: PropTypes.func.isRequired,
    pushURL: PropTypes.func.isRequired,
  };

  componentWillMount() {
    const { getUserAdverts, params: { id } } = this.props;
    getUserAdverts({ id });
  }

  render() {
    const { adverts, pushURL } = this.props;

    return <div className={styles.adverts}>
      {adverts.length > 0 && <div className={styles.list}>
        {adverts.map(advert => <CardAdvert
          key={advert.id}
          title={advert.title}
          image={filterImage(advert.mainImage)}
          className={styles.advert}

          actions={[
            {
              icon: 'open_in_new',
              onClick: () => {
                pushURL(`/advert/${advert.id}`);
              },
            },

            {
              icon: 'star',
              onClick: () => {},
            },
          ]}
        />)}
      </div>}
    </div>;
  }
}

export default connect(
  state => ({
    adverts: _.get(state, 'adverts.getUserAdverts.data.data', []),
  }),

  {
    getUserAdverts: advertsApi.actions.getUserAdverts.sync,
    pushURL: push,
  },
)(Adverts);
