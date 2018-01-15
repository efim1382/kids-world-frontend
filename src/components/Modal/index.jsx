import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'components';
import classNames from 'classnames';
import styles from './style.css';

const Modal = ({
  show, title, hancleClose, children, className,
}) => <div
  className={styles.wrapperModal}
  {...show ? { 'data-show': true } : {}}
>
  <div className={styles.modal}>
    <header className={styles.header}>
      {title && <p className={styles.title}>{ title }</p>}
      <Button icon="close" onClick={hancleClose} />
    </header>

    {children && <div className={classNames(styles.content, className)}>{ children }</div>}
  </div>
</div>;

Modal.propTypes = {
  title: PropTypes.string,
  show: PropTypes.bool.isRequired,
  hancleClose: PropTypes.func.isRequired,
  children: PropTypes.node,
  className: PropTypes.string,
};

export default Modal;
