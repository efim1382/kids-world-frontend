import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { replace } from 'react-router-redux';
import { Card, Icon, Button } from 'components';
import { filterUserPhoto, filterAdvertImage } from 'helpers/filters';
import styles from './style.css';

class Messages extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
  };

  componentDidMount() {
    document.addEventListener('keydown', this.handleDocumentKeyDown);

    setTimeout(() => {
      this.scrollMessagesToBottom();
    }, 0);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleDocumentKeyDown);
  }

  handleDocumentKeyDown = (event) => {
    const { dispatch } = this.props;

    if (event.keyCode === 27) {
      dispatch(replace('/profile/chat'));
    }
  }

  scrollMessagesToBottom = () => {
    this.scrollContainer.scrollTop = this.scrollContainer.scrollHeight;
  };

  render() {
    return <div className={styles.messages}>
      <div className={styles.list}>
        <div className={styles.info}>
          <span className={styles.time}>Был в сети вчера в 22:00</span>
        </div>

        <div className={styles.scroll} ref={(container) => { this.scrollContainer = container; }}>
          <div className={styles.message} data-author="you">
            <div className={styles.text}>
              Здравствуйте!
              Можно купить у вас еще детские кроссовки?
            </div>

            <div className={styles.image} style={{ '--image': filterUserPhoto('/images/user-image.jpg') }} />
          </div>

          <div className={styles.message} data-author="you">
            <div className={styles.text}>
              Здравствуйте!
              Можно купить у вас еще детские кроссовки?
            </div>
          </div>

          <div className={styles.message} data-author="user">
            <div className={styles.image} style={{ '--image': filterUserPhoto('/images/user-image.jpg') }} />
            <div className={styles.text}>Да, можно</div>
          </div>

          <div className={styles.message} data-author="user">
            <div className={styles.text}>Да, можно</div>
          </div>

          <div className={styles.message} data-author="you">
            <div className={styles.text}>
              Здравствуйте! Можно купить у вас еще детские кроссовки?
              Можно купить у вас еще детские кроссовки?
              Можно купить у вас еще детские кроссовки?
              Можно купить у вас еще детские кроссовки?
            </div>
            <div className={styles.image} style={{ '--image': filterUserPhoto('/images/user-image.jpg') }} />
          </div>

          <div className={styles.message} data-author="user">
            <div className={styles.image} style={{ '--image': filterUserPhoto('/images/user-image.jpg') }} />
            <div className={styles.text}>Да, можно</div>
          </div>
        </div>

        <div className={styles.fieldContainer}>
          <input type="text" placeholder="Введите Ваше сообщение" />
          <Button icon="send" className={styles.submit} />
        </div>
      </div>

      <div className={styles.panel}>
        <header className={styles.header}>
          <Card
            image={filterUserPhoto('/images/user-image.jpg')}
            link="/user/1"
            name="Роман Ефимов"
            text="efim1382@gmail.com"
            className={styles.card}
          />

          <div className={styles.property}>
            <Icon name="phone" className={styles.icon} />
            <span className={styles.value}>+79094079312</span>
          </div>

          <div className={styles.property}>
            <Icon name="home" className={styles.icon} />
            <span className={styles.value}>Ростов-на-Дону, Красноармейская, 23</span>
          </div>
        </header>

        <div className={styles.userActivity}>
          <div className={styles.section}>
            <h3 className={styles.title}>Отзывы о пользователе</h3>

            <Card
              image={filterUserPhoto('/images/user-image.jpg')}
              link="/user/1"
              name="Роман Ефимов"
              text="Хороший продавец, ни разу не обманул. Отлично. Прекрасно"
              multiple
              className={styles.review}
            />

            <Card
              image={filterUserPhoto('/images/user-image.jpg')}
              link="/user/1"
              name="Роман Ефимов"
              text="Хороший продавец, ни разу не обманул. Отлично. Прекрасно"
              multiple
              className={styles.review}
            />

            <Card
              image={filterUserPhoto('/images/user-image.jpg')}
              link="/user/1"
              name="Роман Ефимов"
              text="Хороший продавец, ни разу не обманул. Отлично. Прекрасно"
              multiple
              className={styles.review}
            />

            <Link to="/user/1/reviews" className={styles.showAll}>Посмотреть все</Link>
          </div>

          <div className={styles.section}>
            <h3 className={styles.title}>Объявления пользователя</h3>

            <Card
              image={filterAdvertImage('/images/ad-image.jpg')}
              link="/advert/1"
              name="Детские кроссовки"
              text="Хорошие, новые, красивые"
              multiple
              className={styles.review}
            />

            <Card
              image={filterAdvertImage('/images/ad-image.jpg')}
              link="/advert/1"
              name="Детские кроссовки"
              text="Хорошие, новые, красивые"
              multiple
              className={styles.review}
            />

            <Card
              image={filterAdvertImage('/images/ad-image.jpg')}
              link="/advert/1"
              name="Детские кроссовки"
              text="Хорошие, новые, красивые"
              multiple
              className={styles.review}
            />

            <Link to="/user/1/adverts" className={styles.showAll}>Посмотреть все</Link>
          </div>
        </div>
      </div>
    </div>;
  }
}

export default connect()(Messages);
