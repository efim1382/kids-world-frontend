import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './style.css';

const Popup = ({
  children,
  className,
  show,
}) => <div
  className={classNames(styles.popup, className)}
  {...show ? { 'data-show': '' } : {}}
>
  { children }
</div>;

Popup.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  show: PropTypes.bool.isRequired,
};

export default Popup;

