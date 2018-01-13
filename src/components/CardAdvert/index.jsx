import React from 'react';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import UUID from 'node-uuid';
import classNames from 'classnames';
import { Button } from 'components';
import styles from './style.css';

const CardAdvert = ({
  id, title, image, actions, className,
}) => <div className={classNames(styles.cardAdvert, className)}>
  <div className={styles.image} style={{ '--image': image }} />

  <div className={styles.tooltip}>
    <Link to={`/advert/${id}`}>{ title }</Link>

    {actions && <div className={styles.actions}>
      {actions.map(action => <Button
        key={UUID.v4()}
        icon={action.icon}
        className={action.className}
        onClick={action.onClick}
      />)}
    </div>}
  </div>
</div>;

CardAdvert.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  className: PropTypes.string,

  actions: PropTypes.arrayOf(PropTypes.shape({
    icon: PropTypes.string,
    className: PropTypes.string,
    onClick: PropTypes.func,
  })),
};

export default CardAdvert;
