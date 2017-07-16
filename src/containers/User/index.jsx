import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  Header,
  Footer,
} from 'components';
import UserProfile from 'components/UserProfile';

import baseStyles from 'containers/Layout/style.css';

import api from './api';

export api from './api';
export reducers from './reducers';
export routes from './routes';

class User extends Component {
  static propTypes = {
    params: PropTypes.objectOf(PropTypes.string),
    dispatch: PropTypes.func.isRequired,
    children: PropTypes.node,
  }

  state = {
    user: {},
  };

  componentWillMount() {
    const { dispatch, params: { id } } = this.props;

    if (id) {
      dispatch(api.actions.getOneUser({ id })).then((resp) => {
        this.setState({
          user: resp,
        });
      });
    }
  }

  render() {
    const { children, params: { id } } = this.props;

    const navItems = [{
      name: 'Объявления',
      link: `/user/${id}/adverts`,
    }, {
      name: 'Отзывы',
      link: `/user/${id}/reviews`,
    }];

    return (
      <div className={baseStyles.page}>
        <Header />

        <UserProfile user={this.state.user} navigationItems={navItems}>
          { children }
        </UserProfile>

        <Footer />
      </div>
    );
  }
}

export default connect()(User);
