import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { Button } from 'components';

import styles from './style.css';

class Modal extends Component {
  static propTypes = {
    children: PropTypes.node,
    title: PropTypes.string,
    show: PropTypes.bool,
    className: PropTypes.string,
    onClose: PropTypes.func,
  };

  state = {
    show: this.props.show || false,
  }

  componentWillReceiveProps(nextProps) {
    const { show } = nextProps;

    this.setState({
      show: show,
    });
  }

  render() {
    const { children, title, className, onClose } = this.props;

    return (<div
      className={styles.wrapModal}
      {...this.state.show ? { 'data-show': true } : {}}
      onClick={() => {
        this.setState({
          show: false,
        });

        if (onClose) {
          onClose();
        }
      }}
    >
      <div
        className={styles.modal}
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        <header className={styles.header}>
          {title && <p className={styles.title}>{ title }</p>}

          <Button
            type="transparent"
            icon="close"
            className={styles.close}
            onClick={() => {
              this.setState({
                show: false,
              });
            }}
          />
        </header>

        <div className={classNames(styles.content, className)}>
          { children }
        </div>
      </div>
    </div>);
  }
}

export default Modal;

