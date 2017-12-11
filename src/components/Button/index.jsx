import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { Icon } from 'components';

import styles from './style.css';

const Button = ({ caption, icon, appearance = 'none', className, ...props }) => <button
  className={classNames(styles.button, className)}
  data-appearance={appearance}
  {...props}
>
  {caption && <span>{ caption }</span>}
  {icon && <Icon name={icon} />}
</button>;

Button.propTypes = {
  appearance: PropTypes.oneOf(['primary']),
  caption: PropTypes.string,
  icon: PropTypes.string,
  className: PropTypes.string,
};

export default Button;
