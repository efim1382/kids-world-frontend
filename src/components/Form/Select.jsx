import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, actions } from 'react-redux-form';
import { Icon, Popup } from 'components';
import styles from './style.css';

class Select extends Component {
  static propTypes = {
    model: PropTypes.string.isRequired,
    caption: PropTypes.string,
    defaultValue: PropTypes.string,
    formModel: PropTypes.string,
    formDispatch: PropTypes.func,

    items: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    })).isRequired,
  }

  state = {
    value: '',
    name: 'Не выбрано',
    isPopupShown: false,
  }

  componentWillMount() {
    const {
      defaultValue,
      items,
      model,
      formModel,
      formDispatch, // eslint-disable-line no-unused-vars
    } = this.props;

    if (!defaultValue) {
      return;
    }

    const filteredItem = this.filterItems(items, defaultValue);

    this.setState({
      name: filteredItem.name,
      value: filteredItem.value,
    });

    setTimeout(() => {
      if (this.props.formDispatch) {
        this.props.formDispatch(actions.change(`${formModel}${model}`, defaultValue));
      }
    }, 0);
  }

  handleTogglePopup = () => {
    this.setState({
      isPopupShown: !this.state.isPopupShown,
    });
  }

  handlePopupClose = () => {
    this.setState({
      isPopupShown: false,
    });
  }

  handleChange = (name, value) => {
    const { model, formModel, formDispatch } = this.props;

    this.setState({
      name,
      value,
    });

    this.handlePopupClose();

    if (formDispatch) {
      formDispatch(actions.change(`${formModel}${model}`, value));
    }
  }

  filterItems = (items, value) => items.filter(item => item.value === value)[0];

  render() {
    const { model, caption, items } = this.props;

    return <Field model={model} className={styles.fieldContainer}>
      {caption && <span className={styles.caption}>{ caption }</span>}

      <div className={styles.select}>
        <div className={styles.button} onClick={this.handleTogglePopup}>
          <span>{ this.state.name }</span>
          <Icon name="arrow_drop_down" />
        </div>

        <Popup
          parentComponent={this}
          show={this.state.isPopupShown}
          handleClose={this.handlePopupClose}
          className={styles.selectList}
        >
          {items.map(item => <div
            key={item.value}
            className={styles.selectItem}
            onClick={() => { this.handleChange(item.name, item.value); }}
          >
            { item.name }
          </div>)}
        </Popup>
      </div>
    </Field>;
  }
}

export default Select;
