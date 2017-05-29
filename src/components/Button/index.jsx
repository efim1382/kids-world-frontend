import React, { PropTypes } from 'react';
import classNames from 'classnames';
import Icon from 'components/Icon';
import styles from './style.css';

const Button = ({
  type,
  caption,
  icon,
  className,
}) => <button
  className={classNames(styles.button, className)}
  type={type}
  {...icon ? { icon: '' } : {}}
>
  {icon && <Icon icon={icon} />}
  {caption && <span className={styles.caption}>{ caption }</span>}
</button>;

Button.propTypes = {
  type: PropTypes.string.isRequired,
  caption: PropTypes.string,
  icon: PropTypes.string,
  className: PropTypes.string,
};

export default Button;
