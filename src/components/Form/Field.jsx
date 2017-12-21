import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Control, actions } from 'react-redux-form';
import Errors from './Errors';
import styles from './style.css';

const FieldComponent = ({
  model,
  isValid,
  caption,
  errorMessage,
  isValidate,
  className,
  fieldValue,
  type,
  ...props
}) => <div className={classNames(styles.fieldContainer, className)}>
  {caption && <span className={styles.caption}>{ caption }</span>}
  {type !== 'textarea' ? <input type={type} {...props} /> : <textarea {...props} />}

  {isValidate && <Errors
    show={isValid}
    message={errorMessage}
  />}
</div>;

FieldComponent.propTypes = {
  model: PropTypes.string.isRequired,
  caption: PropTypes.string,
  isValidate: PropTypes.bool,
  isValid: PropTypes.bool,
  errorMessage: PropTypes.string,
  fieldValue: PropTypes.string,
  type: PropTypes.string,
  className: PropTypes.string,
};

class Field extends Component {
  static propTypes = {
    model: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['text', 'password', 'email', 'number', 'textarea']),
    placeholder: PropTypes.string,
    caption: PropTypes.string,
    defaultValue: PropTypes.string,
    isValidate: PropTypes.bool,
    formModel: PropTypes.string,
    formDispatch: PropTypes.func,
    getValue: PropTypes.func,
    validator: PropTypes.func,
    errorMessage: PropTypes.string,
    className: PropTypes.string,
  };

  state = {
    value: '',
    message: '',
  };

  componentWillMount() {
    const { defaultValue } = this.props;

    if (defaultValue) {
      this.setState({ value: defaultValue });
    }
  }

  handleChange = (model, value) => {
    const { formDispatch, getValue, isValidate } = this.props;

    this.setState({ value });

    if (getValue) {
      getValue(value);
    }

    if (formDispatch) {
      formDispatch(actions.change(model, value));
    }

    if (!isValidate) {
      return;
    }

    if (value.length === 0) {
      this.setState({
        message: 'Заполните обязательное поле',
      });
    } else if (this.props.errorMessage) {
      this.setState({
        message: this.props.errorMessage,
      });
    }
  };

  render() {
    const {
      model,
      type = 'text',
      caption,
      formModel,
      placeholder,
      defaultValue = '',
      isValidate,
      validator,
      className,
    } = this.props;

    // eslint-disable-next-line no-useless-escape
    const emailReg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return <Control
      model={model}
      component={FieldComponent}
      type={type}
      caption={caption}
      placeholder={placeholder}
      defaultValue={defaultValue}
      controlProps={{ model, fieldValue: this.state.value }}
      changeAction={this.handleChange}
      className={className}

      mapProps={{
        isValid: (props) => {
          const fieldModel = model.replace(/\./i, '');

          const store = props.store.getState();
          if (typeof (store.forms[`${formModel}`][`${fieldModel}`]) === 'undefined') return true;

          const touched = store.forms[`${formModel}`][`${fieldModel}`].touched;
          if (!touched) return true;

          const valid = store.forms[`${formModel}`][`${fieldModel}`].valid;
          return valid;
        },
      }}

      {...isValidate ? {
        isValidate,
        errorMessage: this.state.message,

        validators: {
          empty: () => this.state.value.length > 0,
          ...type === 'email' ? { email: () => emailReg.test(this.state.value) } : {},
          ...type === 'password' ? { password: () => this.state.value.length > 5 } : {},
          ...validator ? { customValidator: validator } : {},
        },

        validateOn: 'change',
      } : {}}
    />;
  }
}

export default Field;
