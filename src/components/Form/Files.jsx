import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Control } from 'react-redux-form';
import classNames from 'classnames';
import styles from './style.css';

class Files extends Component {
  static propTypes = {
    model: PropTypes.string.isRequired,
    label: PropTypes.string,
    className: PropTypes.string,
  };

  state = {
    image: '',
  };

  handleChange = (event) => {
    if (!event.target.files || !event.target.files[0]) {
      return;
    }

    const reader = new FileReader();

    reader.onload = (evt) => {
      this.setState({
        image: evt.target.result,
      });
    };

    reader.readAsDataURL(event.target.files[0]);
  };

  render() {
    const { model, label, className } = this.props;

    return <div className={classNames(styles.files, className)}>
      {label && <label className={styles.caption}>{ label }</label>}
      <label htmlFor="check-file" className={styles.checkButton}>Выбрать файл</label>
      <Control.file id="check-file" model={model} onChange={this.handleChange} />

      <div className={styles.container}>
        {this.state.image && <div className={styles.image} style={{ '--image': `url(${this.state.image})` }} />}
      </div>
    </div>;
  }
}

export default Files;
