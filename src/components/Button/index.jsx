import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Icon } from 'components';
import styles from './style.css';

const Button = ({
  type,
  caption,
  icon,
  onClick,
  isActive,
  disabled,
  className,
  getRef,
  ...props
}) => <button
  className={classNames(styles.button, className)}
  data-type={type}
  {...onClick ? { onClick } : {}}
  {...icon ? { icon: '' } : {}}
  {...isActive ? { 'data-active': '' } : {}}
  {...disabled ? { disabled: true } : {}}
  {...getRef ? { ref: getRef } : {}}
  {...props}
>
  {icon && <Icon icon={icon} />}
  {caption && <span className={styles.caption}>{ caption }</span>}
</button>;

Button.propTypes = {
  type: PropTypes.string.isRequired,
  caption: PropTypes.string,
  icon: PropTypes.string,
  onClick: PropTypes.func,
  getRef: PropTypes.func,
  isActive: PropTypes.bool,
  disabled: PropTypes.bool,
  className: PropTypes.string,
};

export default Button;
