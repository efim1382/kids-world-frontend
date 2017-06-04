import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import UUID from 'node-uuid';
import Button from 'components/Button';
import styles from 'components/Form/style.css';

class Files extends Component {
  static propTypes = {
    caption: PropTypes.string,
  }

  state = {
    images: [],
  };

  componentWillMount() {
    this.inputId = UUID.v4();
  }

  onChange = (event) => {
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
  };

  render() {
    const { caption } = this.props;

    return (
      <div className={classNames(styles.fieldWrapper, styles.files)}>
        {caption && <label className={styles.fieldCaption}>{ caption }</label>}

        <input
          id={this.inputId}
          multiple
          type="file"
          onChange={this.onChange}
          className={styles.fileInput}
        />

        <label htmlFor={this.inputId} className={styles.addFilesLabel}>
          <Button
            type="primary"
            caption="Выбрать изображения"
            className={styles.addFilesButton}
          />
        </label>

        {this.state.images.length > 0 && <div className={styles.fileStore}>
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
