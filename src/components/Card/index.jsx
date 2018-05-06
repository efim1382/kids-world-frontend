import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router';
import { Icon } from 'components';
import PropTypes from 'prop-types';
import styles from './style.css';

const Card = ({
  image, link, name, text, multiple, emotion, className,
}) => <div className={classNames(styles.card, className, multiple ? styles.multiple : '')}>
  {image && <div className={styles.image} style={{ '--image': image }} />}

  <div className={styles.section}>
    <header>
      <Link to={link} className={styles.link}>{ name }</Link>

      {emotion && emotion === 'like' && <Icon name="like" className={styles.like} />}
      {emotion && emotion === 'dislike' && <Icon name="dislike" className={styles.dislike} />}
    </header>

    <p className={styles.text}>{ text }</p>
  </div>
</div>;

Card.propTypes = {
  image: PropTypes.string,
  className: PropTypes.string,
  multiple: PropTypes.bool,
  link: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  emotion: PropTypes.string,
};

export default Card;
