import React, { Component } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { socketConnect } from 'socket.io-react';
import { push } from 'react-router-redux';
import { showNotification } from 'components/Notification/actions';
import { Card, Icon, Button } from 'components';
import { filterUserPhoto, filterAdvertImage } from 'helpers/filters';
import userApi from 'containers/User/api';
import reviewsApi from 'store/reviews';
import advertsApi from 'containers/Profile/Adverts/api';
import chatApi from '../api';
import styles from './style.css';

class Messages extends Component {
  static propTypes = {
    userId: PropTypes.number,

    messages: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      message: PropTypes.string,
      author: PropTypes.string,
    })),

    params: PropTypes.shape({
      id: PropTypes.string,
    }),

    socket: PropTypes.shape({
      on: PropTypes.func,
      emit: PropTypes.func,
    }),

    adverts: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      description: PropTypes.string,
      mainImage: PropTypes.string,
    })),

    user: PropTypes.shape({
      id: PropTypes.number,
      firstName: PropTypes.string,
      lastName: PropTypes.string,
      phone: PropTypes.string,
      email: PropTypes.string,
      address: PropTypes.string,
      photo: PropTypes.string,
      token: PropTypes.string,
    }),

    currentUser: PropTypes.shape({
      id: PropTypes.number,
      firstName: PropTypes.string,
      lastName: PropTypes.string,
      phone: PropTypes.string,
      email: PropTypes.string,
      address: PropTypes.string,
      photo: PropTypes.string,
      token: PropTypes.string,
    }),

    reviews: PropTypes.arrayOf(PropTypes.shape({
      idAuthor: PropTypes.number,
      image: PropTypes.string,
      firstName: PropTypes.string,
      lastName: PropTypes.string,
      text: PropTypes.string,
      emotion: PropTypes.string,
    })),

    updateChats: PropTypes.func,
    showMessage: PropTypes.func,
    getMessages: PropTypes.func,
    getUser: PropTypes.func,
    getUserAdverts: PropTypes.func,
    getUserReviews: PropTypes.func,
    pushUrl: PropTypes.func,
  };

  constructor(props) {
    super(props);

    props.socket.on('message', (responce) => {
      if (responce.status !== 200) {
        props.showMessage(responce.message);
      }

      this.loadMessages(this.props.params.id).then((responceMessages) => {
        if (responceMessages.status === 200 && responceMessages.messages.length === 1) {
          this.props.updateChats();
        }
      });
    });
  }

  componentWillMount() {
    this.loadData();

    this.loadMessages();
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleDocumentKeyDown);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.params.id !== this.props.params.id) {
      this.loadData(nextProps.params.id);
      this.loadMessages(nextProps.params.id);
    }
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleDocumentKeyDown);
  }

  loadMessages = (id = this.props.params.id) => {
    const { getMessages, userId } = this.props;

    if (!id || !userId) {
      return;
    }

    // eslint-disable-next-line consistent-return
    return getMessages({}, {
      body: JSON.stringify({
        idUserFrom: userId,
        idUserTo: id,
      }),
    }).then((responce) => {
      this.scrollMessagesToBottom();
      return responce;
    });
  };

  loadData = (id = this.props.params.id) => {
    const {
      getUser, getUserAdverts, getUserReviews,
    } = this.props;

    if (!id) {
      return;
    }

    getUser({ id });
    getUserReviews({ id });
    getUserAdverts({ id });
  };

  sendMessage = () => {
    const { params: { id }, userId } = this.props;
    const messageText = this.input.value;

    if (!messageText) {
      return;
    }

    const data = {
      userFrom: userId,
      userTo: id,
      message: messageText,
    };

    this.props.socket.emit('message', data);
    this.input.value = '';
  };

  handleDocumentKeyDown = (event) => {
    const { pushUrl } = this.props;

    if (event.keyCode === 27) {
      pushUrl('/profile/chat');
    }

    if (event.keyCode === 13 && this.input === document.activeElement) {
      this.sendMessage();
    }
  }

  scrollMessagesToBottom = () => {
    this.scrollContainer.scrollTop = this.scrollContainer.scrollHeight;
  };

  filterMessagesUserPhoto = (author) => {
    const { user, currentUser } = this.props;

    if (author === 'you') {
      return filterUserPhoto(currentUser.photo);
    }

    return filterUserPhoto(user.photo);
  };

  render() {
    const {
      messages, currentUser, user, reviews, adverts,
    } = this.props;

    return <div className={styles.messages}>
      <div className={styles.list}>
        <div className={styles.info}>
          <span className={styles.time}>Был(а) в сети вчера в 22:00</span>
        </div>

        <div
          className={styles.scroll}
          ref={(container) => { this.scrollContainer = container; }}
        >
          {!_.isEmpty(messages) &&
           !_.isEmpty(currentUser) &&
           !_.isEmpty(user) && messages.map((message, index) => <div
             key={message.id}
             className={styles.message}
             data-author={message.author}
          >
             <div className={styles.text}>{ message.message }</div>

             {((index > 0 &&
               messages[index].author !== messages[index - 1].author) || (index === 0)) && <div
                 className={styles.image}
                 style={{ '--image': this.filterMessagesUserPhoto(message.author) }}
            />}
           </div>)}
        </div>

        <div className={styles.fieldContainer}>
          <input type="text" placeholder="Введите Ваше сообщение" ref={(input) => { this.input = input; }} />
          <Button icon="send" className={styles.submit} onClick={this.sendMessage} />
        </div>
      </div>

      <div className={styles.panel}>
        {!_.isEmpty(user) && <header className={styles.header}>
          <Card
            image={filterUserPhoto(user.photo)}
            link={`/user/${user.id}`}
            name={`${user.firstName} ${user.lastName}`}
            text={user.email}
            className={styles.card}
          />

          <div className={styles.property}>
            <Icon name="phone" className={styles.icon} />
            <span className={styles.value}>{ user.phone }</span>
          </div>

          <div className={styles.property}>
            <Icon name="home" className={styles.icon} />
            <span className={styles.value}>{ user.address }</span>
          </div>
        </header>}

        <div className={styles.userActivity}>
          <div className={styles.section}>
            <h3 className={styles.title}>Отзывы о пользователе</h3>

            {!_.isEmpty(reviews) && reviews.map(review => <Card
              key={review.id}
              image={filterUserPhoto(review.photo)}
              link={`/user/${review.idAuthor}`}
              name={`${review.firstName} ${review.lastName}`}
              text={review.text}
              emotion={review.emotion}
              multiple
              className={styles.review}
            />)}

            {reviews.length >= 3 && <Link
              to={`/user/${user.id}/reviews`}
              className={styles.showAll}
            >Посмотреть все</Link>}

            {_.isEmpty(reviews) && <div className={styles.sectionEmptyMessage}>
              О пользователе еще не оставляли отзывов
            </div>}
          </div>

          <div className={styles.section}>
            <h3 className={styles.title}>Объявления пользователя</h3>

            {!_.isEmpty(adverts) && adverts.map(advert => <Card
              key={advert.id}
              image={filterAdvertImage(advert.mainImage)}
              link={`/advert/${advert.id}`}
              name={advert.title}
              text={advert.description}
              className={styles.review}
            />)}

            {adverts.length >= 3 && <Link
              to={`/user/${user.id}/adverts`}
              className={styles.showAll}
            >Посмотреть все</Link>}

            {_.isEmpty(adverts) && <div className={styles.sectionEmptyMessage}>
              У пользователя еще нет объявлений
            </div>}
          </div>
        </div>
      </div>
    </div>;
  }
}

export default socketConnect(connect(
  state => ({
    userId: parseInt(localStorage.getItem('id'), 10) || null,
    messages: _.get(state, 'chat.getMessages.data.messages', []),
    user: _.get(state, 'users.getUser.data.user', {}),
    adverts: _.get(state, 'adverts.getUserAdverts.data.adverts', []),
    currentUser: _.get(state, 'users.currentUser.data.user', {}),
    reviews: _.get(state, 'reviews.getUserReviews.data.reviews', []),
  }),

  {
    showMessage: showNotification,
    getMessages: chatApi.actions.getMessages.sync,
    getUser: userApi.actions.getUser.sync,
    getUserAdverts: advertsApi.actions.getUserAdverts.sync,
    getUserReviews: reviewsApi.actions.getUserReviews.sync,
    pushUrl: push,
  },
)(Messages));
