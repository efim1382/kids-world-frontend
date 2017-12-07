import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { Control } from 'react-redux-form';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import theme from './theme';
import styles from './style.css';

class SelectComponent extends Component {
  state = {
    value: '',
  };

  handleChange = (event, index, value) => {
    this.setState({ value });
  };

  render() {
    // eslint-disable-next-line react/prop-types
    const { items, ...props } = this.props;

    return <SelectField
      {...props}
      style={theme.selectField}
      onChange={this.handleChange}
      value={this.state.value}
    >
      {items && items.map(item => <MenuItem
        key={item.value}
        value={item.value}
        primaryText={item.name}
      />)}
    </SelectField>;
  }
}

const Select = ({
  model,
  label,
  className,
  defaultValue = '',
  items,
}) => <Control
  model={model}
  className={classNames(styles.input, className)}
  component={SelectComponent}

  controlProps={{
    defaultValue,
    floatingLabelText: label,
  }}

  items={items}
/>;

Select.propTypes = {
  model: PropTypes.string.isRequired,
  label: PropTypes.string,
  defaultValue: PropTypes.string,
  className: PropTypes.string,

  items: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  })).isRequired,
};

export default Select;
