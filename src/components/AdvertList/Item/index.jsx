import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import classNames from 'classnames';
import Button from 'components/Button';
import styles from './style.css';

const Item = ({
  image,
  title,
  link,
  caption,
  className,
}) => <div className={classNames(styles.item, className)}>
  <div className={styles.image} style={{ backgroundImage: `url(${image})` }} />

  <div className={styles.content}>
    <h4 className={styles.title}>{ title }</h4>

    <Link className={styles.button} to={`${link}`}>
      <Button
        type="primary"
        caption={ caption }
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
