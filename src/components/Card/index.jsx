import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import classNames from 'classnames';

import Icon from 'components/Icon';

import styles from './style.css';

const Card = ({
  image,
  title,
  caption,
  link,
  className,
  size,
  emotion,
}) => <div
  className={classNames(styles.card, className)}
  {...size ? { 'data-size': size } : {}}
  {...emotion ? { 'data-emotion': '' } : {}}
>
  <div className={styles.image} style={{ backgroundImage: `url(${image}` }} />

  <div className={styles.section}>
    {link && <Link
      to={link}
      className={classNames(styles.title, styles.link)}
    > { title }</Link>}

    {!link && <h4 className={styles.title}>{ title }</h4>}

    {emotion && emotion == 'like' && <Icon
      icon="thumb_up"
      className={styles.like}
    />}
    {emotion && emotion == 'dislike' && <Icon
      icon="thumb_down"
      className={styles.dislike}
    />}
    <span className={styles.caption}>{ caption }</span>
  </div>
</div>;

Card.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  caption: PropTypes.string,
  link: PropTypes.string,
  className: PropTypes.string,
  size: PropTypes.string,
  emotion: PropTypes.bool,
};

export default Card;
