import React from 'react';
import _ from 'lodash';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';
import PropTypes from 'prop-types';
import { Icon } from 'components';
import { filterUserPhoto } from 'helpers/filters';
import classNames from 'classnames';
import chatApi from 'containers/Profile/Chat/api';
import styles from './style.css';

const ChatLayout = ({ children, chats, className }) => <div className={styles.chatLayout}>
  <div className={styles.sidebar}>
    <div className={styles.search}>
      <Icon name="search" className={styles.icon} />
      <input className={styles.field} type="text" placeholder="Поиск" />
    </div>

    <div className={styles.list}>
      {chats.map(chat => <Link
        key={chat.id}
        to={`/profile/chat/${chat.id}`}

        className={
          (window.location.pathname.includes(`/profile/chat/${chat.id}`))
          ? classNames(styles.item, '_selected')
          : styles.item
        }
      >
        <div className={styles.image} style={{ '--image': filterUserPhoto(chat.photo) }} />

        <div className={styles.section}>
          <h4 className={styles.title}>{ chat.firstName } {chat.lastName}</h4>
          <p className={styles.text}>{ chat.message }</p>
        </div>
      </Link>)}
    </div>
  </div>

  <div className={classNames(styles.content, className)}>{ children }</div>
</div>;

ChatLayout.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,

  chats: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    message: PropTypes.string,
    photo: PropTypes.string,
  })),
};

export default compose(
  connect(
    state => ({
      chats: _.get(state, 'chat.getChats.data.chats', []),
      userId: parseInt(localStorage.getItem('id'), 10) || null,
    }),

    {
      getChats: chatApi.actions.getChats.sync,
    },
  ),

  lifecycle({
    componentWillMount() {
      const { userId } = this.props;

      this.props.getChats({}, {
        body: JSON.stringify({ id: userId }),
      });
    },
  }),
)(ChatLayout);
