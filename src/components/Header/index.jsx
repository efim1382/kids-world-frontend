import _ from 'lodash';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, withState } from 'recompose';
import { replace } from 'react-router-redux';
import classNames from 'classnames';
import { Link } from 'react-router';
import { Icon, Button, Popup } from 'components';
import styles from './style.css';

class Header extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    setSearchValue: PropTypes.func.isRequired,

    adverts: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
    })),
  };

  state = {
    isPopupShown: false,
    isSearchShown: false,
    isSearchPopupShown: false,
    isAuthorize: false,
  };

  componentWillMount() {
    const token = localStorage.getItem('token');

    if (!token) {
      return;
    }

    this.setState({
      isAuthorize: true,
    });
  }

  handleTogglePopup = () => {
    this.setState({
      isPopupShown: !this.state.isPopupShown,
    });
  };

  handlePopupClose = () => {
    this.setState({
      isPopupShown: false,
    });
  };

  handleSearchPopupClose = () => {
    this.setState({
      isSearchPopupShown: false,
    });
  };

  handleLogoutClick = () => {
    const { dispatch } = this.props;

    localStorage.removeItem('token');
    localStorage.removeItem('id');
    dispatch(replace('/'));

    this.setState({
      isAuthorize: false,
    });
  };

  handleSearchButtonClick = () => {
    if (!this.state.isSearchShown) {
      this.setState({ isSearchShown: true });
    }
  };

  handleKeyUp = (event) => {
    this.props.setSearchValue(event.target.value);

    if (!event.target.value) {
      this.setState({ isSearchPopupShown: false });
      return;
    }

    this.setState({ isSearchPopupShown: true });
  };

  render() {
    return <header className={styles.header}>
      <Link to="/" className={styles.logo}>
        <img src="/logo-white.png" alt="Kids World" />
        <h1>Kids World</h1>
      </Link>

      <div className={classNames(styles.search, { '_is-shown': this.state.isSearchShown })}>
        <input type="text" placeholder="Поиск по объявлениям" onKeyUp={this.handleKeyUp} />
        <Button icon="search" onClick={this.handleSearchButtonClick} />

        <Popup
          parentComponent={this}
          show={this.state.isSearchPopupShown}
          handleClose={this.handleSearchPopupClose}
          className={styles.popup}
        >
          <h4>Результаты поиска</h4>

          {!_.isEmpty(this.props.adverts) && this.props.adverts.map(item => <Link
            key={item.id}
            to={`/advert/${item.id}`}
            className={styles.item}
          >
            <label>{item.title}</label>
          </Link>)}

          {_.isEmpty(this.props.adverts) && <span className={styles.emptyMessage}>Не найдено</span>}
        </Popup>
      </div>

      <Button icon="dots" onClick={this.handleTogglePopup} />

      <Popup
        parentComponent={this}
        show={this.state.isPopupShown}
        handleClose={this.handlePopupClose}
        className={styles.popup}
      >
        {!this.state.isAuthorize && <Link to="/auth/login" onClick={this.handlePopupClose}>
          <Icon name="login" />
          <label>Войти</label>
        </Link>}

        {!this.state.isAuthorize && <Link to="/auth/register" onClick={this.handlePopupClose}>
          <Icon name="register" />
          <label>Зарегистрироваться</label>
        </Link>}

        {this.state.isAuthorize && <Link to="/profile/adverts/add" onClick={this.handlePopupClose}>
          <Icon name="add-advert" />
          <label>Подать объявление</label>
        </Link>}

        {this.state.isAuthorize && <div className={styles.divider} />}

        {this.state.isAuthorize && <Link to="/profile/adverts" onClick={this.handlePopupClose}>
          <Icon name="advert" />
          <label>Мои объявления</label>
        </Link>}

        {this.state.isAuthorize && <Link to="/profile/favorites" onClick={this.handlePopupClose}>
          <Icon name="favorite" />
          <label>Избранные объявления</label>
        </Link>}

        {this.state.isAuthorize && <Link to="/profile/chat" onClick={this.handlePopupClose}>
          <Icon name="chat" />
          <label>Сообщения</label>
        </Link>}

        {this.state.isAuthorize && <Link to="/profile/settings" onClick={this.handlePopupClose}>
          <Icon name="settings" />
          <label>Настройки</label>
        </Link>}

        {this.state.isAuthorize && <div className={styles.divider} />}

        {this.state.isAuthorize && <button
          onClick={() => {
            this.handlePopupClose();
            this.handleLogoutClick();
          }}
        >
          <Icon name="logout" />
          <label>Выйти</label>
        </button>}
      </Popup>
    </header>;
  }
}

export default compose(
  withState('searchValue', 'setSearchValue', ''),

  connect((state, props) => ({
    adverts: _.filter(_.get(state, 'adverts.list', []), (advert) => {
      if (props.searchValue) {
        return advert.title.toLowerCase().includes(props.searchValue.toLowerCase());
      }
    }, []),
  })),
)(Header);
