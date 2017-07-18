import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import classNames from 'classnames';
import { Button } from 'components';
import styles from './style.css';

const filterImage = (image) => {
  if (image === 'images/ad-image.jpg') {
    return `/${image}`;
  }

  return `http://localhost:8000/${image}`;
};

const Item = ({
  image,
  title,
  link,
  caption,
  className,
}) => <div className={classNames(styles.item, className)}>
  <div className={styles.image} style={{ backgroundImage: `url(${filterImage(image)})` }} />

  <div className={styles.content}>
    <h4 className={styles.title}>{ title }</h4>

    <Link className={styles.button} to={`${link}`}>
      <Button
        type="primary"
        caption={caption}
      />
    </Link>
  </div>
</div>;

Item.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  caption: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default Item;
