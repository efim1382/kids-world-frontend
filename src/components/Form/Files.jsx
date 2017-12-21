import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Control } from 'react-redux-form';
import UUID from 'node-uuid';
import classNames from 'classnames';
import styles from './style.css';

class Files extends Component {
  static propTypes = {
    model: PropTypes.string.isRequired,
    caption: PropTypes.string,
    multiple: PropTypes.bool,
    className: PropTypes.string,
  };

  state = {
    images: [],
  };

  componentWillMount() {
    this.inputId = UUID.v4();
  }

  handleChange = (event) => {
    const { files } = event.target;
    const imagesArray = [];

    if (!files || !files[0]) {
      return;
    }

    [].forEach.call(files, (file) => {
      const reader = new FileReader();

      reader.onloadend = () => {
        imagesArray.push({
          src: reader.result,
        });

        this.setState({
          images: imagesArray,
        });
      };

      reader.readAsDataURL(file);
    });
  };

  render() {
    const {
      model, caption, multiple, className,
    } = this.props;

    return <div className={classNames(styles.files, className)}>
      {caption && <label className={styles.caption}>{ caption }</label>}
      <label htmlFor={this.inputId} className={styles.checkButton}>Выбрать файл</label>

      <Control.file
        model={model}
        id={this.inputId}
        onChange={this.handleChange}
        {...multiple ? { multiple } : {}}
      />

      {this.state.images.length > 0 && <div className={styles.container}>
        {this.state.images.map(image => <div
          key={UUID.v4()}
          style={{ '--image': `url(${image.src})` }}
          className={styles.image}
        />)}
      </div>}
    </div>;
  }
}

export default Files;
