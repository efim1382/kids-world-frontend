import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './style.css';

const Popup = ({ show, children, className }) => <div
  className={classNames(
    styles.popup,
    className,
    show ? '_show' : '',
  )}
>
  { children }
</div>;

Popup.propTypes = {
  children: PropTypes.node.isRequired,
  show: PropTypes.bool,
  className: PropTypes.string,
};

export default Popup;
