import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from '../style.css';

class Form extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    onSubmit: PropTypes.func,
  };

  submitWrapper = (event) => {
    const { onSubmit } = this.props;

    onSubmit();
    event.preventDefault();
  }

  render() {
    const { children, className } = this.props;

    return (
      <form
        method="post"
        className={classNames(styles.form, className)}
        onSubmit={this.submitWrapper}
      >
        { children }
      </form>
    );
  }
}

export default Form;
