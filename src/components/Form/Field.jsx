import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Control, actions } from 'react-redux-form';
import styles from './style.css';

const FieldComponent = ({
  model,
  caption,
  className,
  type,
  ...props
}) => <div className={classNames(styles.fieldContainer, className)}>
  {caption && <span className={styles.caption}>{ caption }</span>}
  {type !== 'textarea' ? <input type={type} {...props} /> : <textarea {...props} />}
</div>;

FieldComponent.propTypes = {
  model: PropTypes.string.isRequired,
  caption: PropTypes.string,
  type: PropTypes.string,
  className: PropTypes.string,
};

class Field extends Component {
  static propTypes = {
    model: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['text', 'password', 'email', 'number', 'textarea']),
    placeholder: PropTypes.string,
    caption: PropTypes.string,
    defaultValue: PropTypes.any, // eslint-disable-line react/forbid-prop-types
    formDispatch: PropTypes.func,
    formModel: PropTypes.string,
    className: PropTypes.string,
  };

  state = {
    value: '',
    defaultValue: '',
    message: '',
  };

  componentWillReceiveProps(nextProps) {
    const {
      formDispatch, formModel, defaultValue, model,
    } = nextProps;

    if (!defaultValue) {
      return;
    }

    this.setState({
      value: nextProps.defaultValue,
    });

    formDispatch(actions.change(`${formModel}${model}`, defaultValue));
  }

  render() {
    const {
      model,
      type = 'text',
      caption,
      placeholder,
      className,
    } = this.props;

    return <Control
      model={model}
      component={FieldComponent}
      type={type}
      caption={caption}
      placeholder={placeholder}
      className={className}
      onChange={(event) => {
        const { value } = event.target;
        this.setState({ value });
      }}

      controlProps={{
        model,
        value: this.state.value,
      }}
    />;
  }
}

export default Field;
