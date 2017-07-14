import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { LocalForm } from 'react-redux-form';
import styles from 'components/Form/style.css';

const Form = ({
  children,
  className,
  ...props
}) => <LocalForm
  {...props}
  className={classNames(styles.form, className)}
>
  { children }
</LocalForm>;

Form.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default Form;
