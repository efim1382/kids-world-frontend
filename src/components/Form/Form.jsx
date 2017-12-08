import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { LocalForm } from 'react-redux-form';

import Select from './Select';

import styles from './style.css';

class Form extends Component {
  static propTypes = {
    children: PropTypes.node,
    model: PropTypes.string,
    getDispatch: PropTypes.func,
  };

  state = {
    formDispatch: null,
  };

  buildChildren = children => (
    React.Children.map(children, (child) => {
      if (!child || child.type.toString() !== Select.toString()) {
        return child;
      }

      return React.cloneElement(child, {
        formDispatch: this.state.formDispatch,
        formModel: this.props.model,
      });
    })
  )

  render() {
    const { children, ...props } = this.props;

    return <LocalForm
      className={styles.form}
      getDispatch={formDispatch => this.setState({ formDispatch })}
      {...props}
    >
      { this.buildChildren(children) }
    </LocalForm>;
  }
}

export default connect()(Form);
