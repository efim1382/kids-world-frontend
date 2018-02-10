import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'components';
import classNames from 'classnames';
import styles from './style.css';

const Modal = ({
  show, title, handleClose, children, className, wrapperClass,
}) => <div className={classNames(styles.wrapperModal, { '_is-shown': show })}>
  <div className={classNames(styles.modal, wrapperClass)}>
    <header className={styles.header}>
      {title && <p className={styles.title}>{ title }</p>}
      <Button icon="close" onClick={handleClose} />
    </header>

    {children && <div className={classNames(styles.content, className)}>{ children }</div>}
  </div>
</div>;

Modal.propTypes = {
  title: PropTypes.string,
  show: PropTypes.bool,
  handleClose: PropTypes.func.isRequired,
  children: PropTypes.node,
  className: PropTypes.string,
  wrapperClass: PropTypes.string,
};

export default Modal;
