import React from 'react';
import PropTypes from 'prop-types';
import UUID from 'node-uuid';
import classNames from 'classnames';
import { Button } from 'components';
import styles from './style.css';

const CardAdvert = ({
  title, image, actions, className,
}) => <div className={classNames(styles.cardAdvert, className)}>
  <div className={styles.image} style={{ '--image': image }} />

  <div className={styles.tooltip}>
    <h4 className={styles.title}>{ title }</h4>

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
