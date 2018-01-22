import React, { Component } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { filterAdvertImage } from 'helpers/filters';
import advertsApi from 'containers/Profile/Adverts/api';
import { Link } from 'react-router';
import { Button, CardAdvert } from 'components';
import styles from './style.css';

class List extends Component {
  static propTypes = {
    adverts: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      mainImage: PropTypes.string,
    })),

    getUserAdverts: PropTypes.func.isRequired,
    deleteAdvert: PropTypes.func.isRequired,
    pushURL: PropTypes.func.isRequired,
  };

  componentWillMount() {
    const userId = localStorage.getItem('id');
    const { getUserAdverts } = this.props;

    getUserAdverts({ id: userId });
    this.userId = userId;
  }

  render() {
    const {
      adverts, deleteAdvert, getUserAdverts, pushURL,
    } = this.props;

    return <div className={styles.adverts}>
      {_.isEmpty(adverts) && <div className={styles.emptyMessage}>
        У Вас нет объявлений
      </div>}

      <Link to="/profile/adverts/add">
        <Button appearance="primary" caption="Подать объявление" />
      </Link>

      {!_.isEmpty(adverts) && <div className={styles.list}>
        {adverts.map(advert => <CardAdvert
          key={advert.id}
          title={advert.title}
          image={filterAdvertImage(advert.mainImage)}
          className={styles.advert}

          actions={[
            {
              icon: 'open_in_new',
              onClick: () => {
                pushURL(`/advert/${advert.id}`);
              },
            },

            {
              icon: 'mode_edit',
              onClick: () => {
                pushURL(`/profile/adverts/${advert.id}/edit`);
              },
            },

            {
              icon: 'delete',
              className: styles.deleteButton,
              onClick: () => {
                deleteAdvert({ id: advert.id }).then(() => {
                  getUserAdverts({ id: this.userId });
                });
              },
            },
          ]}
        />)}
      </div>}
    </div>;
  }
}

export default connect(
  state => ({
    adverts: _.get(state, 'adverts.getUserAdverts.data.adverts', []),
  }),

  {
    getUserAdverts: advertsApi.actions.getUserAdverts.sync,
    deleteAdvert: advertsApi.actions.deleteAdvert.sync,
    pushURL: push,
  },
)(List);
