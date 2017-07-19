import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import UUID from 'node-uuid';
import { Button } from 'components';

import { Control } from 'react-redux-form';

import styles from 'components/Form/style.css';

class Files extends Component {
  static propTypes = {
    multiple: PropTypes.bool,
    caption: PropTypes.string,
    model: PropTypes.string,
    onChange: PropTypes.func,
    withFilesStore: PropTypes.bool,
  }

  state = {
    images: [],
  };

  componentWillMount() {
    this.inputId = UUID.v4();
  }

  handleChange = (event) => {
    const { onChange, withFilesStore } = this.props;

    if (withFilesStore) {
      const files = event.target.files;
      const imagesArray = [];

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
    }

    if (onChange) {
      onChange(event);
    }
  };

  render() {
    const { model, caption, multiple, withFilesStore } = this.props;

    return (
      <div className={classNames(styles.fieldWrapper, styles.files)}>
        {caption && <label className={styles.fieldCaption}>{ caption }</label>}

        <Control.file
          model={model}
          id={this.inputId}
          type="file"
          className={styles.fileInput}
          onChange={this.handleChange}
          {...multiple ? { multiple } : {}}
        />

        <label htmlFor={this.inputId} className={styles.addFilesLabel}>
          <Button
            type="primary"
            caption={multiple === undefined ? 'Выбрать файл' : 'Выбрать файлы'}
            className={styles.addFilesButton}
          />
        </label>

        {withFilesStore && this.state.images.length > 0 && <div className={styles.fileStore}>
          {this.state.images.map(image => (
            <div
              key={UUID.v4()}
              className={styles.storeImage}
              style={{ backgroundImage: `url(${image.src})` }}
            />
          ))}
        </div>}
      </div>
    );
  }
}

export default Files;
